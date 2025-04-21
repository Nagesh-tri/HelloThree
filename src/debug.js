import { GUI } from 'lil-gui';

export function setupDebugUI(params, onUpdate) {
  const gui = new GUI();

  const textFolder = gui.addFolder('Text Controls');
  textFolder.add(params, 'message').onChange(onUpdate);
  textFolder.add(params, 'size', 0.1, 5).onChange(onUpdate);
  textFolder.add(params, 'depth', 0.1, 2).onChange(onUpdate);

  const posFolder = textFolder.addFolder('Position');
  posFolder.add(params, 'positionX', -10, 10).onChange(onUpdate);
  posFolder.add(params, 'positionY', -10, 10).onChange(onUpdate);
  posFolder.add(params, 'positionZ', -10, 10).onChange(onUpdate);
}
