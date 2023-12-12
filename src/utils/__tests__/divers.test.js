import { isFunc } from '../divers';

test('check if is fn', () => {
    function fn() {
        /** function */
    }

    async function asyncFn() {
        /** asynchrone function */
    }

    const lambda = () => {
        /** lambda function */
    }

    const array = [fn, asyncFn, lambda];
    array.forEach(item => expect(isFunc(item)).toBe(true));
});

test('check if is fn', () => {
    const notFn = null;

    expect(isFunc(notFn)).toBe(false);
})
