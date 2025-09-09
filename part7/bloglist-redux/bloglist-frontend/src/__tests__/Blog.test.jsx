import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../components/Blog';

describe('<Blog />', () => {
  const blog = {
    title: 'React Testing',
    author: 'Dan Abramov',
    url: 'https://reacttesting.com',
    likes: 5,
  };

  test('renders title and author, but not url or likes by default', () => {
    const { container } = render(<Blog blog={blog} />);

    const header = container.querySelector('.blog-header');
    expect(header).toHaveTextContent('React Testing Dan Abramov');

    const details = container.querySelector('.blog-details');
    expect(details).toHaveStyle('display: none');
  });

  test('url and likes are shown when the button is clicked', async () => {
    const { container } = render(<Blog blog={blog} />);
    const user = userEvent.setup();

    const button = screen.getByText('view');
    await user.click(button);

    const details = container.querySelector('.blog-details');
    expect(details).not.toHaveStyle('display: none');
  });

  test('if like button is clicked twice, event handler is called twice', async () => {
    const mockUpdateBlog = vi.fn();

    render(<Blog blog={blog} updateBlog={mockUpdateBlog} />);
    const user = userEvent.setup();

    const viewButton = screen.getByText('view');
    await user.click(viewButton);

    const likeButton = screen.getByText('Like');
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockUpdateBlog.mock.calls).toHaveLength(2);
  });
});
