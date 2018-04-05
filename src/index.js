const { CorePlugin } = Clappr

const getNewId = function* () {
  let i = 0

  while(true) {
    yield `__portalIdPlugin-${++i}`
  }
}

const generator = getNewId()

class ClapprCreatePortal extends Clappr.CorePlugin {
  constructor(core) {
    super(core)
    this.panels = ['lower', 'middle', 'upper']
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
      addPluginPortal: addPluginPortal
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

  addMediaControlPortal(position, panel = 'middle') {
    if(!this.isValidPosition(position, panel)) return

    const id = generator.next().value

    const portal = $('<div />', {
      id,
      'data-controls': '',
    })

    const block = this.getMediaControlBlock(panel, position)
    block.append(portal[0])

    return { id, element: portal[0] }
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

  addPluginPortal(attributes = {}) {
    const id = generator.next().value

    const portal = $('<div />', Object.assign({}, { id }, attributes))

    this.core.$el.append(portal)
    return { id, elment: portal[0] }
  }

  render() {
    return this
  }
}

export default ClapprCreatePortal
