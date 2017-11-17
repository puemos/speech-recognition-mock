export function speechRecognitionResultFn(
  index: number
): SpeechRecognitionResult {
  return {
    isFinal: false,
    length: 0,
    item: speechRecognitionAlternativeFn
  }
}
export function speechRecognitionAlternativeFn(
  index: number
): SpeechRecognitionAlternative {
  return {
    confidence: 1,
    transcript: ''
  }
}

export const oneSentence = (sentence: string, isFinal: boolean = false) => ({
  length: 1,
  item: speechRecognitionResultFn,
  0: {
    item: speechRecognitionAlternativeFn,
    length: 1,
    isFinal,
    0: {
      confidence: 0.9,
      transcript: sentence
    }
  }
})
