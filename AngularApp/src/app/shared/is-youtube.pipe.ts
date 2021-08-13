import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'isYoutube'
})
export class IsYoutubePipe implements PipeTransform {

    transform(value: string, ...args: unknown[]): unknown {
        return value.match(/^https:\/\/www.youtube.com/) !== null;
    }

}
