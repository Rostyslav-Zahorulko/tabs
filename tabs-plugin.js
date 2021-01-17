class Tabs {
  constructor({
    rootSelector,
    activeControlClass = 'active',
    activePaneClass = 'active',
    activeTab = 1,
  }) {
    this._refs = this._getRefs(rootSelector);
    this._activeControlClass = activeControlClass;
    this._activePaneClass = activePaneClass;
    this._activeTabIdx = activeTab - 1;

    this._bindEvents();
    this._setActiveTab();
  }

  _getRefs(root) {
    const refs = {};

    refs.controls = document.querySelector(`${root} [data-controls]`);
    refs.panes = document.querySelector(`${root} [data-panes]`);

    return refs;
  }

  _bindEvents() {
    this._refs.controls.addEventListener(
      'click',
      this._handleOnControlsClick.bind(this),
    );
  }

  _handleOnControlsClick(event) {
    if (event.target.nodeName !== 'A') {
      return;
    }

    this._removeActiveTab();

    const control = event.target;
    this._makeControlActive(control);

    const paneId = this._getPaneId(control);
    this._setActivePane(paneId);
  }

  _setActiveTab() {
    const controls = this._refs.controls.querySelectorAll('a');
    const control = controls[this._activeTabIdx];
    this._makeControlActive(control);

    const paneId = this._getPaneId(control);
    this._setActivePane(paneId);
  }

  _removeActiveTab() {
    const currentActiveControl = this._refs.controls.querySelector(
      `.${this._activeControlClass}`,
    );

    if (!currentActiveControl) {
      return;
    }

    this._makeControlInactive(currentActiveControl);

    const paneId = this._getPaneId(currentActiveControl);
    this._removeActivePane(paneId);
  }

  _setActivePane(id) {
    const pane = this._getPainById(id);
    this._makePaneActive(pane);
  }

  _removeActivePane(id) {
    const pane = this._getPainById(id);
    this._makePaneInactive(pane);
  }

  _getPaneId(control) {
    return control.getAttribute('href').slice(1);
  }

  _getPainById(id) {
    return this._refs.panes.querySelector(`#${id}`);
  }

  _makeControlActive(control) {
    control.classList.add(this._activeControlClass);
  }

  _makeControlInactive(control) {
    control.classList.remove(this._activeControlClass);
  }

  _makePaneActive(pane) {
    pane.classList.add(this._activePaneClass);
  }

  _makePaneInactive(pane) {
    pane.classList.remove(this._activePaneClass);
  }
}

const tabs1 = new Tabs({
  rootSelector: '#tabs-1',
  activeControlClass: 'controls__item--active',
  activePaneClass: 'pane--active',
  activeTab: 1,
});

console.log(tabs1);

const tabs2 = new Tabs({
  rootSelector: '#tabs-2',
  activeControlClass: 'controls__item--active',
  activePaneClass: 'pane--active',
  activeTab: 3,
});

console.log(tabs2);
