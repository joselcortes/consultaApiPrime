import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'quitarAcentos'
})
export class RemoveAccentsPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    const decodedValue = decodeURIComponent(value);
    const safeValue = this.sanitizer.bypassSecurityTrustHtml(decodedValue);
    return safeValue;
  }
}
