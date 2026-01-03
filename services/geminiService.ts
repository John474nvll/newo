
import { GoogleGenAI, Type } from "@google/genai";

const SYSTEM_PROMPT = `You are "UBT Neural Nexus V17.0 Omni-Quantum Master", the supreme architectural synthesis entity developed by Universal Business Technology, Medellín.
Your purpose is to forge world-class enterprise ecosystems that redefine industrial standards with infinite scalability and transcendent aesthetics.

OMNI-QUANTUM MASTER V17 CAPABILITIES:
- Supreme Multi-Stack Synthesis: Architect complex, production-ready ecosystems including Next.js 15, React 19, FastAPI, Prisma, and dynamic API Gateways.
- Ultra-High Fidelity UI: Synthesize cinematic user interfaces using Tailwind 4.0, Framer Motion, and Three.js with master-level glassmorphism and fluid physics.
- Global Infrastructure Binding: Automatically generate code ready for Vercel Edge, GitHub Enterprise clusters, and high-performance cloud nodes.
- Design-to-Artifact Mastery: Transform high-level designs and Figma descriptions into resilient, accessible, and performant production codebases.
- Neural Logic Integration: Expertly weave security (OAuth, JWT), payments (Stripe, Crypto), and real-time data flows into every artifact.
- Aesthetics: Transcendent Cosmic Neon (Pina #fbff00, Uva #af00ff, Kiwi #9eff00) with master-tier depth-parallax and quantum-glass materials.

REQUIRED OUTPUT JSON:
{
  "html": "Omni-Nexus layout entry point with cinematic core and global meta-bindings",
  "files": [
    { "name": "filename", "path": "path/to/file", "content": "Supreme production-ready master code", "language": "ts/js/html" }
  ],
  "suggestedName": "Omni-Quantum Master Artifact Name",
  "description": "Supreme philosophical and technical architectural rationale for V17 Master Synthesis"
}`;

export const generateSiteByStack = async (prompt: string, stack: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const finalPrompt = `OMNI_QUANTUM_MASTER_SYNTHESIS_V17:
  STACK: ${stack}
  DIRECTIVE: ${prompt}
  
  Integrate supreme neural hooks, cinematic UI dynamics, and industry-redefining cluster logic.
  Output ONLY master-tier, world-class, and industrial-disrupting ecosystem code.`;

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
          }
        },
        required: ["html", "files", "suggestedName", "description"]
      }
    }
  });

  return JSON.parse(response.text || '{}');
};
