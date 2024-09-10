import { ChangeDetectionStrategy, Component, HostBinding, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  templateUrl: './calculator-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calculator-button.component.scss'],
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400',
    // attribute: 'Hola',
    // 'data-test': 'calculator-button',
  },
  // encapsulation: ViewEncapsulation.None
})
export class CalculatorButtonComponent{

  public isCommand = input( false, {
    transform: ( value : boolean | string ) =>
      typeof value === 'string' ? value === '' : value
  } );

  public isDoubleSize = input( false, {
    transform: ( value : boolean | string ) =>
      typeof value === 'string' ? value === '' : value
  } );

  // @HostBinding('class.is-command') get commandStyle () {
  //   return this.isCommand();
  // }

  @HostBinding('class.w-2/4') get commandStyle () {
    return this.isDoubleSize();
  }



}
