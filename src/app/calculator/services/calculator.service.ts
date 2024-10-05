import { Injectable, signal } from '@angular/core';

const numbers = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ];
const operators = [ '+', '-', 'x', '÷', '/', '*' ];
const specialOperators = ['+/-','%','.','=','C', 'Backspace']

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  public resultText = signal( '0' );
  public subResultText = signal( '0' );
  public lastOperator = signal( '+' );

  public constructNumber ( value: string) : void {
    if( ![ ...numbers, ...operators, ...specialOperators ].includes( value ) ) {
      return;
    }


    if ( value === '='){
      this.calculateResult();
      return;
    }

    //Limpiar resultado
    if ( value === 'C'){
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }
    //Backspace
    //TODO: revisar numeros negativos
    if( value === 'Backspace'){
      if( this.resultText() === '0' ) return;

      if( this.resultText().includes('-') && this.resultText().length === 2){
        this.resultText.set('0');
        return;
      }

      if( this.resultText().length === 1 ){
        this.resultText.set('0');
        return;
      }

      this.resultText.update( current => current.slice(0, -1));
      return;
    }

    //Aplicar operador
    if( operators.includes( value ) ){

      this.calculateResult();

      this.lastOperator.set( value );
      this.subResultText.set( this.resultText() );
      this.resultText.set( '0' );
      return;
    }

    //Limitar numero de caracteres
    if( this.resultText().length >= 10){
      //console.log('Max length reached');
      return;
    }

    //
    if ( value === '.' && !this.resultText().includes('.') ) {
      // if ( this.resultText() === '0' || this.resultText() === '' ) {
      //   this.resultText.update( current => current + '0.' );
      // }
      if ( this.resultText() === '' ) {
        this.resultText.update( current => current + '0.' );
      }

      this.resultText.update( current => current + '.' );

      return;
    }

    //Manejo del cero inivial
    if( value === '0' && (this.resultText() === '0' || this.resultText() === '-0') ){
      return;
    }

    //Cambiar signo
    if( value === '+/-'){
      if( this.resultText().includes('-')){
        this.resultText.update( current => current.slice(1) );
        return;
      }

      this.resultText.update( current => '-' + current );
      return;
    }

    //Numeros
    if( numbers.includes( value ) ){
      if( this.resultText() === '0' ){
        this.resultText.set( value );
        return;
      }

      if( this.resultText() === '-0' ){
        this.resultText.set( '-' + value );
        return;
      }

      this.resultText.update( current => current + value );
      return;
    }


  }

  public calculateResult(){

    const number1 = parseFloat( this.subResultText() );
    const number2 = parseFloat( this.resultText() );

    let result = 0;

    switch( this.lastOperator()) {
      case '+':
        result = number1 + number2;
        break;

      case '-':
        result = number1 - number2;
        break;

      case 'x':
      case '*':
        result = number1 * number2;
        break;

      case '÷':
      case '/':
        result = number1 / number2;
        break;
    }

    this.resultText.set( result.toString() );
    this.subResultText.set( '0' );


  }

}
