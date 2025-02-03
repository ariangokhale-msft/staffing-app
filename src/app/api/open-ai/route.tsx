import { NextResponse } from "next/server";
import OpenAI from "openai";

// Define types for request body and project data
interface OpenAIRequestBody {
  skillsText: string;
  hoursAvailable: number;
  earliestStartDate: string;
  requestedRoles: string[];
}

interface Project {
  id: number;
  projectName: string;
  requestedRole: string;
  requestedStartDate: string; // "YYYY-MM-DD"
  primarySkill: string;
  hoursPerWeek: number;
}

// Initialize Azure OpenAI client
const azureOpenAI = new OpenAI({
    apiKey: process.env.AZURE_OPENAI_API_KEY,
    baseURL: process.env.AZURE_OPENAI_BASE_URL,
    defaultQuery: { "api-version": process.env.AZURE_OPENAI_API_VERSION },
    defaultHeaders: { "api-key": process.env.AZURE_OPENAI_API_KEY },
});




// Sample project data
const projects: Project[] = [
  {
    id: 1,
    projectName: "AI Platform Development",
    requestedRole: "Consultant",
    requestedStartDate: "2025-03-01",
    primarySkill: "Machine Learning Ops (ML Ops)",
    hoursPerWeek: 20,
  },
  {
    id: 2,
    projectName: "Cloud Migration",
    requestedRole: "Senior Consultant",
    requestedStartDate: "2025-04-01",
    primarySkill: "Azure Services",
    hoursPerWeek: 40,
  },
  {
    id: 3,
    projectName: "Data Platform Engineering",
    requestedRole: "Consultant",
    requestedStartDate: "2025-03-15",
    primarySkill: "Data Engineering",
    hoursPerWeek: 30,
  },
  {
    id: 4,
    projectName: "Compliance and Governance",
    requestedRole: "Senior Consultant",
    requestedStartDate: "2025-05-01",
    primarySkill: "Governance Compliance",
    hoursPerWeek: 25,
  },
];

export async function POST(request: Request) {
  try {
    const body: OpenAIRequestBody = await request.json();
    const { skillsText, hoursAvailable, earliestStartDate, requestedRoles } = body;

    // Validate required fields
    if (!skillsText || !hoursAvailable || !earliestStartDate || !requestedRoles?.length) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: 'skillsText', 'hoursAvailable', 'earliestStartDate', or 'requestedRoles'.",
        },
        { status: 400 }
      );
    }

    // Build the prompt with your specified instructions
    const prompt = `
    You are an AI assistant designed to match users to suitable AI project opportunities.
    
    You will receive two JSON inputs:
    1. A JSON array called "projects" containing project objects. Each project has:
       - id (integer)
       - projectName (string)
       - requestedRole (string)
       - requestedStartDate (string in YYYY-MM-DD format)
       - primarySkill (string)
       - hoursPerWeek (integer)
    
    2. A JSON object called "userRequest" with:
       - skillsText (string describing user skills)
       - hoursAvailable (integer)
       - earliestStartDate (string in YYYY-MM-DD format)
       - requestedRoles (array of strings)
    
    Your task is to RETURN a JSON object with two arrays:
    1. "matchedProjects": all projects that satisfy the following four criteria:
       (C1) The project's "primarySkill" is relevant (not exact, but thematically related) to the "skillsText" in the user request.
       (C2) The user’s "hoursAvailable" >= the project’s "hoursPerWeek".
       (C3) The user’s "earliestStartDate" <= the project's "requestedStartDate".
       (C4) The project’s "requestedRole" is included in the user’s "requestedRoles" array.
    
    2. "otherProjects": all projects that satisfy only criteria (C2), (C3), and (C4), but do not satisfy (C1).
    
    IMPORTANT:
    - Interpret "skillsText" in a flexible manner to see if it relates to the project's "primarySkill" (e.g., "Python" can relate to "Data Engineering" or "Machine Learning Ops (ML Ops)").
    - Output must be valid JSON containing exactly two keys: "matchedProjects" and "otherProjects".
    - Each key should map to an array of matching project objects that meet the specified criteria.
    - **Return ONLY the JSON object**. Do not include any markdown, code fences, or extra text.
    
    Here is your data:
    
    "projects": ${JSON.stringify(projects)}
    "userRequest": ${JSON.stringify(body)}
    `;    

    // Request the AI to interpret the user's skills
    const response = await azureOpenAI.chat.completions.create({
      model: "gpt-4", // or your Azure model name
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    // The AI should return a JSON object with "matchedProjects" and "otherProjects"
    const resultText = response.choices[0]?.message?.content?.trim() || "";

    // Attempt to parse the AI's output as JSON
    try {
      const parsed = JSON.parse(resultText);
      return NextResponse.json(parsed, { status: 200 });
    } catch (parseError) {
      console.error("Error parsing AI response as JSON:", parseError);
      return NextResponse.json(
        { error: "Invalid JSON from AI. Could not parse." },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
