import { Injectable } from '@angular/core';
import { Lesson } from 'src/app/model/lesson';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  readonly _getLessonsURL = "http://localhost:8080/lessons/user"

  private lessons$: BehaviorSubject<Lesson[]> = new BehaviorSubject(new Array())

  constructor(private httpClient: HttpClient) { }

  getLessons(){
    this.httpClient.get(
      this._getLessonsURL,
      {
        withCredentials: true,
      }
    ).subscribe(
      res => {
        let obj: Lesson[] = JSON.parse(JSON.stringify(res))
        let lessons: Lesson[] = new Array()
        obj.forEach(x => {
          lessons.push(new Lesson(
            // @ts-ignore
            x.id, x.userID, x.courseID, x.date, x.slot, x.status, x.done, x.subjectID, x.teacherID, x.subjectString, x.teacherString //TODO
          ))
          this.lessons$.next(lessons)
        })
      },
      err => console.log(err) //TODO
    )
    return this.lessons$.asObservable()
  }
}
