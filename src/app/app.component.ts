import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Calculator';
  displayContent: number = 0;
  elements: number[] = [];
  ops: string[] = [];
  calcFinished: boolean = true;

  pressKey = (event: Event) => {
    const key = (event.target as HTMLButtonElement).innerHTML;
    switch (key) {
      case 'C':
        this.displayContent = 0;
        this.elements = [];
        this.ops = [];
        this.calcFinished = true;
        break;
      case '+':
        this.elements.push(this.displayContent);
        this.ops.push('+');
        this.displayContent = 0;
        break;
      case '-':
        this.elements.push(this.displayContent);
        this.ops.push('-');
        this.displayContent = 0;
        break;
      case '*':
        this.elements.push(this.displayContent);
        this.ops.push('*');
        this.displayContent = 0;
        break;
      case '/':
        this.elements.push(this.displayContent);
        this.ops.push('/');
        this.displayContent = 0;
        break;
      case '+/-':
        this.displayContent *= -1;
        break;
      case '=':
        this.elements.push(this.displayContent);
        this.calculate();
        this.calcFinished = true;
        break;
      default:
        if (this.calcFinished) {
          this.displayContent = 0;
        }
        const value = Number(key);
        this.displayContent =
          this.displayContent >= 0
            ? 10 * this.displayContent + value
            : 10 * this.displayContent - value;
        this.calcFinished = false;
    }
  };

  calculate = () => {
    let sum = this.elements[0];
    this.ops.forEach((op: string, index: number) => {
      switch (op) {
        case '+':
          sum += this.elements[index + 1];
          break;
        case '-':
          sum -= this.elements[index + 1];
          break;
        case '*':
          sum *= this.elements[index + 1];
          break;
        case '/':
          sum /= this.elements[index + 1];
          break;
      }
    });
    this.displayContent = sum;
    this.elements = [];
    this.ops = [];
  };
}
