import SearchResults from '@/components/SearchResults';
import Head from 'next/head';

const BooksPage = () => {
    return (
      <>
        <div className="container mx-auto p-4">
          <SearchResults />
        </div>
      </>
    );
};

export default BooksPage;
