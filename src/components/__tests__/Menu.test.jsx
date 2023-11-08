import { render, screen } from '@testing-library/react';
import Menu from '../Menu';

import { applicationTitle } from '../../data/constantes';

test('test jsx example', () => {
    render(<Menu />);

    const title = screen.queryByText(applicationTitle);
    expect(title).toBeVisible();
});
