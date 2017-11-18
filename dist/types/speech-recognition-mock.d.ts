/// <reference types="webspeechapi" />
export interface SpeechRecognitionEventMap {
    audiostart: Event;
    soundstart: Event;
    speechstart: Event;
    speechend: Event;
    soundend: Event;
    result: SpeechRecognitionEvent;
    nomatch: SpeechRecognitionEvent;
    error: SpeechRecognitionError;
    start: Event;
    end: Event;
}
export interface SpeechRecognitionEventMock extends SpeechRecognitionEvent, CustomEvent {
}
export interface SpeechRecognitionStaticMock {
    prototype: SpeechRecognitionMock;
    new (): SpeechRecognitionMock;
}
export interface ISpeechRecognitionMock extends SpeechRecognition {
    say(sentence: string, isFinal: boolean, resultIndex: number): void;
}
export declare class SpeechRecognitionMock implements ISpeechRecognitionMock {
    grammars: SpeechGrammarList;
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives: number;
    serviceURI: string;
    onaudiostart: (ev: Event) => any;
    onsoundstart: (ev: Event) => any;
    onspeechstart: (ev: Event) => any;
    onspeechend: (ev: Event) => any;
    onsoundend: (ev: Event) => any;
    onresult: (ev: SpeechRecognitionEvent) => any;
    onnomatch: (ev: SpeechRecognitionEvent) => any;
    onerror: (ev: SpeechRecognitionError) => any;
    onstart: (ev: Event) => any;
    onend: (ev: Event) => any;
    started: boolean;
    private listeners;
    constructor();
    addEventListener<K extends keyof SpeechRecognitionEventMap>(type: K, listener: (ev: SpeechRecognitionEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    dispatchEvent(ev: Event): boolean;
    removeEventListener<K extends keyof SpeechRecognitionEventMap>(type: K, listener?: (ev: SpeechRecognitionEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    start(): void;
    stop(): void;
    abort(): void;
    say(sentence: string, isFinal: boolean): void;
}
