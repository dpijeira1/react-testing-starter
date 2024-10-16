import { render, screen } from '@testing-library/react';
import { User } from '../../src/entities';
import UserAccount from '../../src/components/UserAccount';

describe('UserAccount', () => {
    it('should render user name', () => {
        const user: User = { id: 1, name:'Dan' };
        render(<UserAccount user={user} />);

        expect(screen.getByText(user.name)).toBeInTheDocument();
    })
    it('should render an edit button is the user is an admin', () => {
        const user: User = { id: 1, name:'Dan', isAdmin: true };
        render(<UserAccount user={user} />);
        expect(screen.queryByRole('button')).toBeInTheDocument();
        expect(screen.queryByRole('button')).toHaveTextContent(/edit/i);
    })
    it('should not render an edit button is the user is not an admin', () => {
        const user: User = { id: 1, name:'Dan', isAdmin: false };
        render(<UserAccount user={user} />);
        const button = screen.queryByRole('button');
        expect(button).not.toBeInTheDocument();
    })
})