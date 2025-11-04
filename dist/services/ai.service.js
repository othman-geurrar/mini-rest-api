const API_KEY = 'API-EXAMPLE';
const GEMINI_MODEL = 'gemini-2.5-flash-preview-09-2025';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${API_KEY}`;
const mockTranscribeAudio = async (noteId) => {
    // In a real app, this would involve fetching the audio file and sending it to a transcription service.
    console.log(`[Mock AI Service] Transcribing audio for note ID: ${noteId}`);
    const mockTranscribedText = "The patient, a 45-year-old male, came in today reporting persistent discomfort in the upper left abdomen for the last three days. He described the pain as dull and constant, rating it 5 out of 10. He hasn't experienced fever or nausea. He also mentioned that over-the-counter antacids provided no relief. We scheduled him for an ultrasound on Wednesday morning.";
    // Simulate a network delay for the transcription process
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockTranscribedText;
};
const mockGenerateSummary = async (transcribedText) => {
    // 1. Define the System Instruction (AI Persona/Task)
    const systemPrompt = 'You are a specialized medical summarization AI. Condense the following patient consultation transcript into a structured, concise medical summary suitable for charting. Focus on Chief Complaint, History, Findings, and Action Plan. Use abbreviations (e.g., y/o, w/) where appropriate.';
    // 2. Define the User Query
    const userQuery = `Transcript to summarize:\n---\n${transcribedText}`;
    // 3. Construct the Gemini API Payload
    const payload = {
        contents: [{ parts: [{ text: userQuery }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] },
    };
    console.log(`[Mock AI Service] Simulating POST to Gemini API URL: ${API_URL}`);
    console.log(`[Mock AI Service] Payload contents prepared with system instruction.`);
    // --- MOCK API CALL EXECUTION ---
    // In a real application, you would execute the fetch request here:
    /*
      const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
      });
      const result = await response.json();
       Assuming successful result structure
       return result.candidates?.[0]?.content?.parts?.[0]?.text || "Failed to generate summary.";
      */
    // Simulate Network Delay and return mock result based on content
    await new Promise((resolve) => setTimeout(resolve, 800));
    // 4. Mock the final AI response (extracted text)
    if (transcribedText.includes('upper left abdomen')) {
        return '45 y/o male with persistent dull pain (5/10) w/ upper left abdominal discomfort x 3 days. No fever/nausea. Antacids ineffective. **Action Plan:** Scheduled for ultrasound on Wednesday a.m.';
    }
    return 'Summary generated successfully. Review audio for details.';
};
export const generateAISummary = async (noteId) => {
    // Step 1: Get the transcribed text (mocked)
    const transcribedText = await mockTranscribeAudio(noteId);
    // Step 2: Generate the summary from the text (mocked API call)
    const summaryContent = await mockGenerateSummary(transcribedText);
    return summaryContent;
};
//# sourceMappingURL=ai.service.js.map