import { Component } from '@angular/core';
import quiz_questions_pokemon from "../../../assets/data/quiz_questions_pokemon.json";


@Component({
  selector: 'app-quiz-pokemon',
  templateUrl: './quiz-pokemon.component.html',
  styleUrls: ['./quiz-pokemon.component.css']
})
export class QuizPokemonComponent {
  title: string = ""
  subtitle: string = ""
  questions: any
  questionSelected: any
  answers: string[] = []
  answerSelected: string = ""
  questionIndex: number = 0
  questionMaxIndex: number = 0
  finished: boolean = false

  constructor() { }

  ngOnInit(): void {
    if(quiz_questions_pokemon){
      this.finished = false
      this.title = quiz_questions_pokemon.title
      this.subtitle = quiz_questions_pokemon.subtitle
      this.questions = quiz_questions_pokemon.questions
      this.questionSelected = this.questions[this.questionIndex]
      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
    }
  }

  playerChoice(value: string) {
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep() {
    this.questionIndex += 1
    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    } else {
      const finalAnswer: string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quiz_questions_pokemon.results[finalAnswer as keyof typeof quiz_questions_pokemon.results]
      console.log(this.answers)
    }
  }

  async checkResult(answers: string[]) {
    const result = answers.reduce((previous, current, index, array) => {
      if (
        array.filter(item => item === previous).length > 
        array.filter(item => item === current).length
        ) {
        return previous
      } else {
        return current
      }
    })

    return result
  }
}