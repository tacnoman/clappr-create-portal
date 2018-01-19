class ClapprCreatePortal extends Clappr.CorePlugin {
  constructor(core) {
    super(core)
    this.nextPortalID = 0
    this.panels = ['lower', 'middle', 'upper']
    this.positions = ['left', 'center', 'right']
  }

  get name() { return 'clapprCreatePortal' }

  get mediaControl() {
    return this.core.getPlugin('globo_media_control')
  }

  cachePanels() {
    this.panels.forEach((panel) => {
      this.positions.forEach((position) => {
        const element = this.mediaControl.$el
          .find(`.media-control-panel__${panel} .media-control-position__${position}`)

        this.mediaControlBlock[panel + position] = element
      })
    })
  }

  getExternalInterface() {
    return {
      addPortal: this.addPortal
    }
  }

  getPortal(id) {
    const v = this.mediaControl.$el.find(`#${id}`)
    if (v.length > 0) {
      // TODO: return element if panel and position are different?
      return v[0]
    }
  }

  isValidPosition() {
    if (this.positions.indexOf(position) === -1) {
      console.error('position should be one of these: ["left", "center", "right"]')
      return false
    }

    if (this.panels.indexOf(panel) === -1) {
      console.error('panel should be one of these: ["lower", "middle", "upper"]')
      return false
    }
  }

  addPortal(position, panel = 'middle') {
    if(!this.isValidPosition()) return

    const id = this.nextPortalID++

    const portal = $('<div />', {
      id,
      'data-controls': '',
      css: {width: '100px', height: '100px', background: 'red'}
    })

    this.mediaControlBlock[panel + position].append(portal[0])

    return { id, element: portal[0] }
  }
}

export default ClapprCreatePortal
