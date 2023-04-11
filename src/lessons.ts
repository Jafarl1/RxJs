import { Observable, debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';

const search$ = new Observable<Event>((observer) => {
  const search = document.getElementById('search');
  if (!search) {
    observer.error('Element not found!');
    return;
  } else {
    search.addEventListener('input', (event) => {
      observer.next(event);
    });
  }
});

// const search$ = fromEvent<Event>(
//   document.getElementById('search') as HTMLElement,
//   'input'
// );

search$
  .pipe(
    map((event) => {
      return (event.target as HTMLInputElement).value;
    }),
    debounceTime(800),
    distinctUntilChanged()
  )
  .subscribe({
    next: (value) => {
      if (value) {
        console.log(value);
      }
    },
    error: (err) => {
      console.error(err);
    },
    complete: () => {
      console.log('The end!');
    },
  });
