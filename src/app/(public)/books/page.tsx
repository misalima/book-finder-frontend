import { Suspense } from 'react';
import SearchResults from '@/components/SearchResults';
import LoadingScreen from '@/components/LoadingScreen';

const BooksPage = () => {
    return (
      <>
        <div className="container mx-auto p-4">
          <Suspense fallback={<LoadingScreen />}>
            <SearchResults />
          </Suspense>
        </div>
      </>
    );
};

export default BooksPage;
