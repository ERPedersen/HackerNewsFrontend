import {Injectable} from '@angular/core';
import * as $ from 'jquery/dist/jquery.min.js';

@Injectable()
export class AnimationService {

  constructor() { }

  public fadeIn(elementId: string) {
    let val = 0;
    let duration = 5; // Duration in miliseconds

    $(elementId).css('display', 'block');

    let fadeInInterval = setInterval(function(){
      if(val < 100) {
        $(elementId).css('opacity', val/100);
        val++;
      } else {
        $(elementId).css('opacity', '1');
        clearInterval(fadeInInterval);
      }
    }, duration);
  }

  public fadeOut(elementId: string) {
    let val = 100;
    let duration = 5; // Duration in miliseconds

    let fadeOutInterval = setInterval(function(){
      if(val > 0) {
        $(elementId).css('opacity', val/100);
        val--;
      } else {
        $(elementId).css('opacity', '0');
        $(elementId).css('display', 'none');
        clearInterval(fadeOutInterval);
      }
    }, duration);
  }
}
