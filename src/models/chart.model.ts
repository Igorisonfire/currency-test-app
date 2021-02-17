namespace IChart {
    export interface Segment {
        avg: number
        max: number
        min: number
        x: string
    }

    export interface Lines {
        avg: Point[]
        max: Point[]
        min: Point[]
    }

    export interface Point {
        value: number
        date: string
    }
}

export default IChart;
