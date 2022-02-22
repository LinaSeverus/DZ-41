'use strict';

class Human {
    constructor(name, surname, yearOfBirth) {
        this.name = name;
        this.surname = surname;
        this.yearOfBirth = yearOfBirth;
    };
    age() {
        return 2022 - this.yearOfBirth
    }
};


class Student extends Human {
    constructor(name, surname, yearOfBirth) {
        super(...arguments);
        this.attendance = new Array(10);
        this.rating = new Array(10);
    };


    present() {
        let emptyElementIndex = this.#findEmptyElement(this.attendance);
        this.attendance[emptyElementIndex] = true
    };
    absent() {
        let emptyElementIndex = this.#findEmptyElement(this.attendance);
        this.attendance[emptyElementIndex] = false
    };
    _mark(ratingValue) {
        if (ratingValue < 0 || ratingValue > 10) throw new Error('Rating must be only 0-10!')
        let emptyElementIndex = this.#findEmptyElement(this.rating);
        this.rating[emptyElementIndex] = ratingValue
    };

    #findEmptyElement(arr) {
        let emptyElementIndex = arr.findIndex((item) => item === undefined);
        return emptyElementIndex
    };

    _getAverageRating() {
        let numOfElementsRating = 0;
        let sumRating = this.rating.reduce((prevValue, item) => {
            ++numOfElementsRating;
            return item + prevValue
        }, 0);
        let averageRating = sumRating / numOfElementsRating;
        return averageRating
    };
    get getAverageRating() {
        return this._getAverageRating()
    };

    _getAverageAttendance() {
        let numOfElementsAttendance = 0;
        let sumAttendance = this.attendance.reduce((prevValue, item) => {
            ++numOfElementsAttendance;
            return +item + prevValue
        }, 0);
        let averageAttendance = sumAttendance / numOfElementsAttendance;
        return averageAttendance
    };
    get getAverageAttendance() {
        return this._getAverageAttendance()
    };

    _summary() {
        let averageRating = this._getAverageRating()
        let averageAttendance = this._getAverageAttendance();

        if (averageRating >= 9 && averageAttendance >= 0.9) {
            return 'Ути какой молодчинка!'
        };

        if ((averageRating < 9 && averageAttendance >= 0.9) || (averageRating >= 9 && averageAttendance < 0.9)) {
            return 'Норм, но можно лучше'
        };

        if (averageRating < 9 && averageAttendance < 0.9) {
            return 'Редиска!'
        };
    };
    get summary() {
        return this._summary()
    };
};

let student1 = new Student('Max', 'Black', 1990);

console.log(student1);
student1._mark(10);
student1._mark(8);
student1._mark(5);
console.log(student1._getAverageRating());

student1.present();
student1.present();
student1.absent();
student1.present();
console.log(student1._getAverageAttendance());

console.log(student1._summary());
console.log(student1.age());

