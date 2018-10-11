jest.mock('clappr', () => ( { CorePlugin: jest.fn() } ))

import ClapprCreatePortal from '../'

describe('ClapprCreatePortal', () => {
  describe('default configuration', () => {
    it('sets the panels', () => {
      const subject = new ClapprCreatePortal()
      expect(subject.panels).toEqual(['front-layer', 'lower', 'middle', 'upper', 'back-layer'])
    })
  })
})
