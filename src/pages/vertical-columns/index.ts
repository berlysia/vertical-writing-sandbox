import './styles.css';

interface ContainerState {
  hasOverflow: boolean;
  container: HTMLElement;
  statusElement: HTMLElement;
  toggleButton: HTMLElement;
}

const containers = new Map<string, ContainerState>();

const initializeContainers = (): void => {
  const container1 = document.getElementById('container-1');
  const status1 = document.getElementById('status-1');
  const button1 = document.getElementById('toggle-overflow-1');

  if (container1 && status1 && button1) {
    containers.set('container-1', {
      hasOverflow: true,
      container: container1,
      statusElement: status1,
      toggleButton: button1
    });
  }

  const container2 = document.getElementById('container-2');
  const status2 = document.getElementById('status-2');
  const button2 = document.getElementById('toggle-overflow-2');

  if (container2 && status2 && button2) {
    containers.set('container-2', {
      hasOverflow: false,
      container: container2,
      statusElement: status2,
      toggleButton: button2
    });
  }

  updateAllContainers();
};

const setupEventListeners = (): void => {
  containers.forEach((state, containerId) => {
    state.toggleButton.addEventListener('click', () => {
      toggleOverflow(containerId);
    });
  });

  window.addEventListener('resize', () => {
    logContainerInfo();
  });
};

const toggleOverflow = (containerId: string): void => {
  const state = containers.get(containerId);
  if (!state) return;

  state.hasOverflow = !state.hasOverflow;
  updateContainer(containerId, state);
  
  state.container.classList.add('highlight');
  setTimeout(() => {
    state.container.classList.remove('highlight');
  }, 1000);

  console.log(`${containerId}: overflow changed to ${state.hasOverflow ? 'auto' : 'visible'}`);
  logContainerInfo();
};

const updateContainer = (containerId: string, state: ContainerState): void => {
  const { container, statusElement } = state;

  if (state.hasOverflow) {
    container.classList.remove('no-overflow');
    container.classList.add('overflow-auto');
    container.style.overflow = 'auto';
    
    statusElement.textContent = '現在: overflow: auto（スクロール親）';
    statusElement.className = 'status overflow-auto';
  } else {
    container.classList.remove('overflow-auto');
    container.classList.add('no-overflow');
    container.style.overflow = 'visible';
    
    statusElement.textContent = '現在: overflow なし（ビューポート依存）';
    statusElement.className = 'status overflow-visible';
  }
};

const updateAllContainers = (): void => {
  containers.forEach((state, containerId) => {
    updateContainer(containerId, state);
  });
};

const logContainerInfo = (): void => {
  console.group('Container Information');
  
  containers.forEach((state, containerId) => {
    const rect = state.container.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(state.container);
    
    console.log(`${containerId}:`, {
      overflow: computedStyle.overflow,
      width: rect.width,
      height: rect.height,
      scrollWidth: state.container.scrollWidth,
      scrollHeight: state.container.scrollHeight,
      hasOverflow: state.hasOverflow
    });
  });
  
  console.log('Viewport:', {
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  console.groupEnd();
};

document.addEventListener('DOMContentLoaded', () => {
  initializeContainers();
  setupEventListeners();
  console.log('縦書きマルチカラムデモが初期化されました');
});

export {};