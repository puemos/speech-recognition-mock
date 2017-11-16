export interface SpeechRecognitionEventMap {
  audiostart: Event
  soundstart: Event
  speechstart: Event
  speechend: Event
  soundend: Event
  result: SpeechRecognitionEvent
  nomatch: SpeechRecognitionEvent
  error: SpeechRecognitionError
  start: Event
  end: Event
}

export interface SpeechRecognitionEventMock
  extends SpeechRecognitionEvent,
    CustomEvent {}

export interface SpeechRecognitionStaticMock {
  prototype: SpeechRecognitionMock
  new (): SpeechRecognitionMock
}
export class SpeechRecognitionMock implements SpeechRecognition {
  public grammars: SpeechGrammarList
  public lang: string
  public continuous: boolean
  public interimResults: boolean
  public maxAlternatives: number
  public serviceURI: string
  private listeners: {
    [K in keyof SpeechRecognitionEventMap]: Array<
      (ev: SpeechRecognitionEventMap[K]) => any
    >
  }

  public onaudiostart: (ev: Event) => any
  public onsoundstart: (ev: Event) => any
  public onspeechstart: (ev: Event) => any
  public onspeechend: (ev: Event) => any
  public onsoundend: (ev: Event) => any
  public onresult: (ev: SpeechRecognitionEvent) => any
  public onnomatch: (ev: SpeechRecognitionEvent) => any
  public onerror: (ev: SpeechRecognitionError) => any
  public onstart: (ev: Event) => any
  public onend: (ev: Event) => any

  public started: boolean
  constructor() {
    this.listeners = {
      audiostart: [],
      soundstart: [],
      speechstart: [],
      speechend: [],
      soundend: [],
      result: [],
      nomatch: [],
      error: [],
      start: [],
      end: []
    }
  }
  addEventListener<K extends keyof SpeechRecognitionEventMap>(
    type: K,
    listener?: (ev: SpeechRecognitionEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void {
    this.listeners[type].push(listener)
  }
  dispatchEvent(ev: Event): boolean {
    if (!(ev.type in this.listeners)) {
      return true
    }
    this.listeners[ev.type].forEach(callback => {
      callback.call(this, ev)
    })
    return true
  }
  removeEventListener<K extends keyof SpeechRecognitionEventMap>(
    type: K,
    listener?: (ev: SpeechRecognitionEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void {
    if (!(type in this.listeners)) {
      return
    }
    this.listeners[type] = this.listeners[type].filter(
      callback => callback !== listener
    )
  }

  start(): void {
    if (this.started) {
      throw new DOMException(
        "Failed to execute 'start' on 'SpeechRecognition': recognition has already started."
      )
    }
    this.started = true
    // Create and dispatch an event
    const event = document.createEvent('CustomEvent')
    this.onstart(event)
  }
  stop(): void {
    this.abort()
  }
  abort(): void {
    if (!this.started) {
      return
    }
    this.started = false
    // Create and dispatch an event
    const event = document.createEvent('CustomEvent')
    event.initCustomEvent('end', false, false, null)

    this.onend(event)
  }
  say(results: SpeechRecognitionResultList, resultIndex: number = 0) {
    // Create the event
    const event = document.createEvent(
      'CustomEvent'
    ) as SpeechRecognitionEventMock
    event.initCustomEvent('result', false, false, {})
    event.resultIndex = resultIndex
    event.results = results
    event.interpretation = null
    event.emma = null
    this.onresult(event)
  }
}
