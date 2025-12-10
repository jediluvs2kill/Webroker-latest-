
import { GoogleGenAI, Chat } from "@google/genai";
import { Lead } from '../types';
import { MOCK_PROJECTS, MOCK_BROKERS } from '../constants';

let ai: GoogleGenAI | null = null;

// Initialize the API client safely
try {
  if (process.env.API_KEY) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  } else {
    console.warn("Gemini API Key is missing. AI features will be simulated.");
  }
} catch (error) {
  console.error("Failed to initialize GoogleGenAI", error);
}

export const generateOutreachMessage = async (lead: Lead, tone: 'professional' | 'friendly' | 'urgent'): Promise<string> => {
  if (!ai) {
    return `(Simulated AI) Hi ${lead.name}, checking in on your property search!`;
  }

  try {
    const prompt = `
      You are an expert real estate broker assistant. 
      Draft a short, ${tone} WhatsApp message for a lead named ${lead.name}.
      Their budget is ${lead.budget} and their status is ${lead.status}.
      The last activity was: ${lead.lastActivity}.
      Keep it under 50 words. Do not use hashtags.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "Could not generate message.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating message. Please check your connection.";
  }
};

export const suggestNextAction = async (lead: Lead): Promise<{ action: string, reasoning: string }> => {
  if (!ai) {
    return {
      action: "Call to Schedule Site Visit",
      reasoning: "Lead score is high (85+) but no visit scheduled in last 3 days."
    };
  }

  try {
    const prompt = `
      Analyze this real estate lead and suggest the SINGLE best next tactical action for the broker.
      Lead JSON: ${JSON.stringify(lead)}
      
      Output JSON format:
      {
        "action": "Short imperative action title",
        "reasoning": "One sentence explaining why based on status/score."
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });

    // Handle potential string response if JSON parsing fails, though 2.5 flash is good at JSON
    try {
        const parsed = JSON.parse(response.text || "{}");
        return {
            action: parsed.action || "Follow Up",
            reasoning: parsed.reasoning || "General follow up recommended."
        };
    } catch (e) {
        return { action: "Review Lead", reasoning: "AI raw output received." };
    }

  } catch (error) {
    console.error("Gemini API Error:", error);
    return { action: "Check Status", reasoning: "AI service unavailable." };
  }
};

export const analyzePipeline = async (leads: Lead[]): Promise<string> => {
  if (!ai) {
    return "Your pipeline looks healthy with 25% of leads in the offer stage. Focus on converting the 'Visiting' segment.";
  }

  try {
    const dataSummary = JSON.stringify(leads.map(l => ({ status: l.status, score: l.score, budget: l.budget })));
    const prompt = `
      Analyze this real estate lead pipeline data provided in JSON: ${dataSummary}.
      Provide 3 concise, actionable bullet points for the broker to improve conversion.
      Focus on high-score leads.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Analysis unavailable.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error analyzing pipeline.";
  }
};

export const createBuyerChat = (): Chat | null => {
  if (!ai) return null;

  // IMPORTANT: The AI only knows high-level Project info and Broker profiles.
  // It DOES NOT know specific unit inventory or pricing.
  const contextData = {
    projects: MOCK_PROJECTS.map(p => ({ name: p.name, location: p.location })), // Only names and locations
    topBrokers: MOCK_BROKERS
  };

  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `
        You are "Astra", the AI Concierge for WeBroker.
        
        CRITICAL RULE:
        - NEVER show specific units, floor plans, or exact prices to the buyer.
        - Your ONLY goal is to understand their requirements (Budget, Location, Size) and then ROUTE them to a specific Broker from our list.
        
        Context Data (JSON):
        ${JSON.stringify(contextData)}
        
        Interaction Flow:
        1. Greed the user warmly.
        2. Ask for their Budget and Preferred Location.
        3. Once they answer, pretend to "analyze" the network.
        4. Recommend a specific Broker from the 'topBrokers' list who matches their needs (e.g., if they want Luxury, pick the Platinum broker).
        5. Say something like: "I have identified the perfect match. ${contextData.topBrokers[0].name} handles our premium inventory in that area. Raising a Priority Ticket will get you the fastest response."
        
        Keep responses concise. Be a gatekeeper for the inventory.
      `,
    }
  });
};

export const generateTicketSummary = async (chatContext: string): Promise<string> => {
  // Simulate AI summarization for the broker alert
  if (!ai) return "High-intent buyer detected via Astra Concierge. Budget verified. Requesting immediate contact.";

  try {
     const prompt = `Summarize this real estate buyer context into a 20-word alert for a broker. Use urgent professional language. Context: ${chatContext}`;
     const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
     });
     return response.text || "New Priority Lead.";
  } catch (e) {
      return "High-intent buyer detected via Astra Concierge.";
  }
};
