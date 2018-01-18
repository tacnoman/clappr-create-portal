const initPlugin = (
  UICorePlugin
) => {
  return class ClapprCreatePortal extends UICorePlugin {
    constructor(core) {
      super(core)
    }

    get name() {
      return 'clapprCreatePortal'
    }

    get panel() {
      return 'upper'
    }

    get position() {
      return 'right'
    }

    get attributes() {
      return {
        'id': 'clapprPortal',
        'data-controls': '',
      }
    }

    get tagName() {
      return 'div'
    }

    addPortal(id) {
      const v = this.$el.find(`#${id}`)
      if(v.length > 0) {
        return v[0]
      }

      const portal = document.createElement('div')
      portal.setAttribute('id', id)

      this.$el.append(portal)
      this.core.getPlugin('globo_media_control').$el.prepend(this.$el[0])

      return portal
    }
  }
}

if(typeof window !== 'undefined') {
  window.clapprCreatePortal = initPlugin
}

export default initPlugin
