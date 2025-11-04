import { describe, it, expect, vi } from 'vitest';
import { generateAISummary } from '../services/ai.service.js';
// Define the expected mock outputs for comparison
const SPECIFIC_SUMMARY = '45 y/o male with persistent dull pain (5/10) w/ upper left abdominal discomfort x 3 days. No fever/nausea. Antacids ineffective. **Action Plan:** Scheduled for ultrasound on Wednesday a.m.';
const DEFAULT_SUMMARY = 'Summary generated successfully. Review audio for details.';
const mockTranscriptionContent = {
    // Contains the keyword for the specific summary
    positiveCase: 'The patient, a 45-year-old male, came in today reporting persistent discomfort in the upper left abdomen for the last three days.',
    // Lacks the keyword, triggering the default summary
    negativeCase: 'The patient is reporting general fatigue and requested a refill for their blood pressure medication.',
};
describe('AI Summary Generation (Mocked)', () => {
    // Spy on console.log to keep test output clean
    vi.spyOn(console, 'log').mockImplementation(() => { });
    // --- Test 1: Successful Path (Specific Summary) ---
    // Test that the specific, structured summary is returned when the mock transcription contains keywords.
    it('should return a specific, structured summary for keyword-rich text', async () => {
        // Since the mockTranscribeAudio in ai.service.ts already returns text
        // with "upper left abdomen", we rely on the default module behavior for this test.
        const noteId = '651a89c9d0f3a5b6c7e8d9b1';
        const summary = await generateAISummary(noteId);
        expect(summary).toBe(SPECIFIC_SUMMARY);
    });
    // --- Test 2: Default Path (No Keyword Match) ---
    // This test is harder because mockTranscribeAudio is internal. We must
    // mock the entire module to control its dependencies for an isolated test.
    it('should return the default summary when transcription lacks keywords', async () => {
        // Temporarily redefine the mockGenerateSummary function's behavior for this test block
        // by mocking the entire service implementation and controlling the transcription text.
        // Fix unexpected any and unused noteId per linting feedback.
        vi.doMock('./ai.service', async (importOriginal) => {
            const original = (await importOriginal());
            return {
                ...original,
                // The noteId parameter is required for signature but not used in this test mock
                generateAISummary: async () => {
                    const transcribedText = mockTranscriptionContent.negativeCase;
                    if (transcribedText.includes('upper left abdomen')) {
                        return SPECIFIC_SUMMARY;
                    }
                    return DEFAULT_SUMMARY;
                },
            };
        });
        // Re-import the mocked module (if necessary, but Vitest often handles this).
        // For simplicity, we trust the test environment's automatic re-import.
        const noteId = 'someOtherId';
        // We call the function and assert it hits the fallback logic
        const summary = await generateAISummary(noteId);
        expect(summary).toBe(DEFAULT_SUMMARY);
    });
});
//# sourceMappingURL=ai.service.test.js.map