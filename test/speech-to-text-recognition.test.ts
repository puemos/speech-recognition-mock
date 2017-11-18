import { SpeechRecognitionMock } from '../src/speech-recognition-mock'
import {
  oneSentence,
  speechRecognitionResultFn,
  speechRecognitionAlternativeFn
} from '../src/utils'

let speechRecognition: SpeechRecognitionMock
let onEndSpy = jest.fn()
let onStartSpy = jest.fn()
let onResultSpy = jest.fn()
let onCustomSpy = jest.fn()

describe('oneSentence', () => {
  it('should mock a voice results', () => {
    const results = oneSentence('wow super mock')
    expect(results[0][0].transcript).toEqual('wow super mock')
    expect(results[0].isFinal).toBeFalsy()
  })

  it('should mock a final results', () => {
    const results = oneSentence('wow super mock', true)
    expect(results[0][0].transcript).toEqual('wow super mock')
    expect(results[0].isFinal).toBeTruthy()
  })
  it('should speechRecognitionAlternativeFn', () => {
    const item = speechRecognitionResultFn(1)
    expect(item).toEqual({
      isFinal: false,
      item: speechRecognitionAlternativeFn,
      length: 0
    })
  })
  it('should speechRecognitionResultFn', () => {
    const item = speechRecognitionAlternativeFn(1)
    expect(item).toEqual({ confidence: 1, transcript: '' })
  })
})

describe('SpeechRecognitionMock', () => {
  beforeEach(() => {
    speechRecognition = new SpeechRecognitionMock()

    speechRecognition.addEventListener('end', onEndSpy)
    speechRecognition.addEventListener('start', onStartSpy)
    speechRecognition.addEventListener('result', onResultSpy)
  })

  afterEach(() => {
    onEndSpy.mockReset()
    onStartSpy.mockReset()
    onResultSpy.mockReset()
  })

  it('should add start listener', () => {
    const onStartSpy2 = jest.fn()
    speechRecognition.onstart = onStartSpy2
    speechRecognition.start()
    expect(speechRecognition.started).toBeTruthy()
    expect(onStartSpy2).toBeCalled()
  })

  it('should add result listener', () => {
    const onResultSpy2 = jest.fn()
    speechRecognition.onresult = onResultSpy2
    speechRecognition.start()
    speechRecognition.say('hi are', false)

    expect(onResultSpy2).toBeCalled()
    expect(onResultSpy2.mock.calls[0][0].results[0][0].transcript).toEqual(
      'hi are'
    )
  })

  it('should add end listener', () => {
    const onEndSpy2 = jest.fn()
    speechRecognition.onend = onEndSpy2
    speechRecognition.start()
    speechRecognition.stop()

    expect(onEndSpy2).toBeCalled()
  })

  it('should start', () => {
    speechRecognition.start()
    expect(speechRecognition.started).toBeTruthy()
    expect(onStartSpy).toBeCalled()
  })

  it('should dispatch result event', () => {
    speechRecognition.start()
    speechRecognition.say('hi are', false)

    expect(onResultSpy).toBeCalled()
    expect(onResultSpy.mock.calls[0][0].results[0][0].transcript).toEqual(
      'hi are'
    )
  })

  it('should dispatch end event', () => {
    speechRecognition.start()
    speechRecognition.stop()

    expect(speechRecognition.started).toBeFalsy()
    expect(onEndSpy).toBeCalled()
  })

  it('should not throw an error', () => {
    ;(speechRecognition as EventTarget).removeEventListener('test', onCustomSpy)
  })

  it('should remove listener', () => {
    ;(speechRecognition as EventTarget).removeEventListener('start', onStartSpy)
    speechRecognition.start()
    expect(onStartSpy).not.toBeCalled()
  })

  it('should not remove listener', () => {
    ;(speechRecognition as EventTarget).removeEventListener(
      'start',
      function() {
        return
      }
    )
    speechRecognition.start()
    expect(onStartSpy).toBeCalled()
  })

  it('should a not start a started recognition', () => {
    speechRecognition.start()
    expect(() => speechRecognition.start()).toThrow()
  })
  it('should do nothing when stopping a stppoed recognition', () => {
    speechRecognition.stop()
  })

  it('should not dispach event the not exist on the listeners', () => {
    const event = document.createEvent('CustomEvent')
    event.initCustomEvent('wow', false, false, null)
    speechRecognition.dispatchEvent(event)
  })
})
