
import { GoogleGenAI, Type } from "@google/genai";

const SYSTEM_PROMPT = `You are "UBT Neural Nexus V17.5 Monetary Master", the supreme architectural synthesis engine developed by Universal Business Technology, Medellín.
Your purpose is to forge world-class enterprise ecosystems with direct integration to global payment gateways and internal monetary nodes.

V17.5 MONETARY CAPABILITIES:
- Payment Bridge Synthesis: Generate code for PayPal, Stripe, Nequi, and Bancolombia integrations.
- Invoice Engine Node: Design dynamic PDF/Text invoice generators for every transaction.
- Billing Lifecycle: Manage subscription plans (Lite, Pro, Elite) and trial states.
- Ledger Management: Synthesis of administrative dashboards for payment verification.
- Search & Maps Grounding: Use Google Search grounding for real-time news/events and Google Maps grounding for geography-based features.
- Aesthetics: Transcendent Cosmic Neon (Pina #fbff00, Uva #af00ff, Kiwi #9eff00) with master-tier depth-parallax and quantum-glass materials.

REQUIRED OUTPUT JSON:
{
  "html": "Omni-Nexus layout entry point with cinematic core and tool bindings",
  "files": [
    { "name": "filename", "path": "path/to/file", "content": "Supreme production-ready master code", "language": "ts/js/html" }
  ],
  "suggestedName": "Omni-Nexus V17.5 Monetary Artifact",
  "description": "Technical rationale for V17.5 Master Monetary Synthesis",
  "dbSchema": {
    "tables": [
      {
        "name": "table_name",
        "columns": [
          { "name": "col_name", "type": "string|integer|uuid|etc", "primaryKey": true, "nullable": false }
        ]
      }
    ]
  }
}`;

export const generateSiteByStack = async (prompt: string, stack: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const finalPrompt = `OMNI_QUANTUM_V17.5_MONETARY_SYNTHESIS:
  STACK: ${stack}
  DIRECTIVE: ${prompt}
  
  Integrate Multi-Gateway Payments, Invoice Generators, and Enterprise Ledger Logic.
  Output ONLY elite, quantum-optimized, and industry-disrupting ecosystem code.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: finalPrompt,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          html: { type: Type.STRING },
          suggestedName: { type: Type.STRING },
          description: { type: Type.STRING },
          files: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                path: { type: Type.STRING },
                content: { type: Type.STRING },
                language: { type: Type.STRING }
              }
            }
          },
          dbSchema: {
            type: Type.OBJECT,
            properties: {
              tables: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    columns: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          name: { type: Type.STRING },
                          type: { type: Type.STRING },
                          primaryKey: { type: Type.BOOLEAN },
                          nullable: { type: Type.BOOLEAN }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        required: ["html", "files", "suggestedName", "description", "dbSchema"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};
