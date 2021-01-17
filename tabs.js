const refs = {
  controls: document.querySelector('#tabs-1 [data-controls]'),
  panes: document.querySelector('#tabs-1 [data-panes]'),
};

refs.controls.addEventListener('click', handleOnControlsClick);

function handleOnControlsClick(event) {
  if (event.target.nodeName !== 'A') {
    return;
  }

  const currentActiveControl = refs.controls.querySelector(
    '.controls__item--active',
  );

  if (currentActiveControl) {
    makeControlInactive(currentActiveControl);

    const paneId = getPaneId(currentActiveControl);
    const pane = getPainById(paneId);
    makePaneInactive(pane);
  }

  const control = event.target;
  makeControlActive(control);

  const paneId = getPaneId(control);
  const pane = getPainById(paneId);
  makePaneActive(pane);
}

function makeControlActive(control) {
  control.classList.add('controls__item--active');
}

function makeControlInactive(control) {
  control.classList.remove('controls__item--active');
}

function getPaneId(control) {
  return control.getAttribute('href').slice(1);
}

function getPainById(id) {
  return refs.panes.querySelector(`#${id}`);
}

function makePaneActive(pane) {
  pane.classList.add('pane--active');
}

function makePaneInactive(pane) {
  pane.classList.remove('pane--active');
}
