import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import fruitsInfo from "../mockData/mock_data_load.json"

export type FruitsState = {
    fruits: Fruit[]
}

export type Fruit = {
    id: number,
    title: string,
    description: string,
    price: number,
    image: string,
    country: string,
    tab: string
}

const fruitsInitialState: FruitsState = {
    fruits: fruitsInfo.fruits.sort((fruitA, fruitB) => {
        if (fruitA.title < fruitB.title) {
            return -1;
        }
        if (fruitA.title > fruitB.title) {
            return 1;
        }
        return 0;
    })
};

export const fruitsSlice = createSlice({
    name: "fruits",
    initialState: fruitsInitialState,
    reducers: {
        addFruit: (state, action: PayloadAction<Omit<Fruit, "id">>) => {
            const latestId = state.fruits.reduce((acc, fruit) => {
                if (fruit.id > acc) {
                    return fruit.id;
                }
                return acc;
            }, 0);
            state.fruits.push({ ...action.payload, id: latestId + 1 });
        },
        removeFruit: (state, action: PayloadAction<number>) => {
            state.fruits = state.fruits.filter((fruit) => fruit.id !== action.payload);
        }
    }
});

export const { addFruit, removeFruit } = fruitsSlice.actions;

export default fruitsSlice.reducer;