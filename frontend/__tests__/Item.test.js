import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Item from '../components/Item';

const fakeItem = {
  id: 'ABC123',
  title: 'A Cool Item',
  price: 5000,
  description: 'This item is really cool!',
  image: 'dog.jpg',
  largeImage: 'largedog.jpg',
};

describe('<Item />', () => {
  it('renders and displays properly', () => {
    const wrapper = shallow(<Item item={fakeItem} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
