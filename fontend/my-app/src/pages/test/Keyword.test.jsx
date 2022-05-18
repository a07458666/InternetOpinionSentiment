import { render, screen  } from '@testing-library/react';
import Keyword from '../Keyword';

describe('Keyword Page', () => {
  
  beforeEach(() =>{ // if use beforeall it will auto cleanup in aftereach
    render(<Keyword />)
  });

  test('Title', () => {
    expect(screen.getByText(/Keyword/i)).toBeInTheDocument();
  });

  test('Recharts Exists',()=>{
    expect(screen.getByRole('linechart')).toBeTruthy();
  })

});



