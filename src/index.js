import { CorePlugin } from 'clappr'

class IdGenerator {
  constructor() {
    this.counter = 1
  }

  next() {
    const id = `__portalIdPlugin-${this.counter}`
    this.counter += 1
    return id
  }
}

const generator = new IdGenerator

class ClapprCreatePortal extends CorePlugin {
  constructor(core) {
    super(core)
    this.panels = ['front-layer', 'lower', 'middle', 'upper', 'back-layer']
    this.positions = ['left', 'center', 'right']
    this.mediaControlBlock = {}
  }

  get name() { return 'clapprCreatePortal' }

  get mediaControl() {
    return this.core.getPlugin('globo_media_control')
  }

  getExternalInterface() {
    return {
      addMediaControlPortal: this.addMediaControlPortal,
      addVideoContainerPortal: this.addVideoContainerPortal,
      addPluginPortal: this.addPluginPortal
    }
  }

  isValidPosition(position, panel) {
    if (this.positions.indexOf(position) === -1) {
      console.error('position should be one of these: ["left", "center", "right"]')
      return false
    }

    if (this.panels.indexOf(panel) === -1) {
      console.error('panel should be one of these: ["lower", "middle", "upper"]')
      return false
    }

    return true
  }


  getMediaControlBlock(panel, position) {
    const key = panel + position

    if (!this.mediaControlBlock[key]) {
      const element = this.mediaControl.$el
        .find(`.media-control-panel__${panel} .media-control-position__${position}`)
      this.mediaControlBlock[key] = element
    }

    return this.mediaControlBlock[key]
  }

  addVideoContainerPortal(tag='div', attributes = {}) {
    const id = generator.next()

    if (typeof attributes.style === 'Object') {
      console.error('You must pass style as a string')
      return
    }

    const portal = $(`<${tag} />`, Object.assign({}, { id }, attributes))

    this.core.getCurrentContainer().$el.append(portal[0])
    return { id, element: portal[0] }
  }

  addMediaControlPortal(position, panel = 'middle') {
    if(!this.isValidPosition(position, panel)) return

    const id = generator.next()

    const portal = $('<div />', {
      id,
      'data-controls': '',
    })

    const block = this.getMediaControlBlock(panel, position)
    block.append(portal[0])

    return { id, element: portal[0] }
  }

  addPluginPortal(tag='div', attributes = {}) {
    const id = generator.next()

    if (typeof attributes.style === 'Object') {
      console.error('You must pass style as a string')
      return
    }

    const portal = $(`<${tag} />`, Object.assign({}, { id }, attributes))

    this.core.$el.append(portal[0])
    return { id, element: portal[0] }
  }

  render() {
    return this
  }
}

export default ClapprCreatePortal
