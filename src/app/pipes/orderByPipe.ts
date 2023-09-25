import { Pipe, PipeTransform } from "@angular/core";
import { orderBy } from "lodash";
@Pipe({
    name: "orderBy"
})
export class OrderByPipe implements PipeTransform {
      transform(arr: any, SortBy: string, order?: string): any[] {
          const sortOrder = order ? order : 'asc';
          return orderBy(arr, [SortBy], [sortOrder] as any);
      }
}