import { oneSentence } from './utils'

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

export interface ISpeechRecognitionMock extends SpeechRecognition {
  say(sentence: string, isFinal: boolean, resultIndex: number): void
}

export class SpeechRecognitionMock implements ISpeechRecognitionMock {
  public grammars: SpeechGrammarList
  public lang: string
  public continuous: boolean
  public interimResults: boolean
  public maxAlternatives: number
  public serviceURI: string

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

  private listeners: {
    [key: string]: ((ev: Event) => any)[]
  }

  constructor() {
    this.listeners = {}
  }
  addEventListener<K extends keyof SpeechRecognitionEventMap>(
    type: K,
    listener: (ev: SpeechRecognitionEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void {
    this.listeners[type] = this.listeners[type] || []
    this.listeners[type].push(listener)
  }
  dispatchEvent(ev: Event): boolean {
    if (!(ev.type in this.listeners)) {
      return true
    }
    this.listeners[ev.type]
      .filter(callback => typeof callback === 'function')
      .forEach(callback => {
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
    event.initCustomEvent('start', false, false, null)
    if (this.onstart) {
      this.onstart(event)
    }
    this.dispatchEvent(event)
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
    if (this.onend) {
      this.onend(event)
    }
    this.dispatchEvent(event)
  }

  say(sentence: string, isFinal: boolean): void {
    const results = oneSentence(sentence, isFinal)
    // Create the event
    const event = document.createEvent(
      'CustomEvent'
    ) as SpeechRecognitionEventMock
    event.initCustomEvent('result', false, false, {})
    event.resultIndex = results.length
    event.results = results
    event.interpretation = null
    delete event.emma
    if (this.onresult) {
      this.onresult(event)
    }
    this.dispatchEvent(event)
  }
}
