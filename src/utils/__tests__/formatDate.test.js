import { expect, test } from 'vitest';
import { dateString } from '../formatDate';

test('check if fn is fn', () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;

    let wantedValue = day < 10 ? ("0" + day) : day;
    wantedValue += "/" + (month < 10 ? ("0" + month) : month);
    wantedValue += "/" + (today.getFullYear());

    const testedValue = dateString(today);

    expect(testedValue).toBe(wantedValue);
});
