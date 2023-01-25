enum Color {
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#8BC34A',
    '#f3cb53',
    '#009688',
    '#107714',
    '#F44336'
}

enum Name {
    'Открытый',
    'Оплаченный',
    'Готовиться',
    'Готово',
    'Доставка',
    'Выполнено курьером',
    'Выполнен',
    'Отмена'
}

export type StatusId = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

export class Status {
    id: StatusId 
    constructor(id: StatusId ){
        this.id = id
    }
    getName(){
        return Name[this.id]
    }
    getColor(){
        return Color[this.id]
    }
    static list(){
        return Object.keys(Color).filter(key=> !Number.isNaN(Number(key))).map((id)=>{
            return {
                color: Color[id],
                name: Name[id],
                id: Number(id)
            }
        })

    }
}