import BaseComponent from './BaseComponent';

export default class Preloader extends BaseComponent {
  constructor(parameters){
    super(parameters)
  }

  open() {
    this.block.classList.add(this.modifiers.isOpen);
  }

  close() {
    this.block.classList.remove(this.modifiers.isOpen);
  }

}
