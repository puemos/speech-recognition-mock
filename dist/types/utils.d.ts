/// <reference types="webspeechapi" />
export declare function speechRecognitionResultFn(index: number): SpeechRecognitionResult;
export declare function speechRecognitionAlternativeFn(index: number): SpeechRecognitionAlternative;
export declare const oneSentence: (sentence: string, isFinal?: boolean) => {
    length: number;
    item: (index: number) => SpeechRecognitionResult;
    0: {
        item: (index: number) => SpeechRecognitionAlternative;
        length: number;
        isFinal: boolean;
        0: {
            confidence: number;
            transcript: string;
        };
    };
};
