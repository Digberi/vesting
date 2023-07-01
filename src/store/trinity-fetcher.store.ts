import { Trinity } from '@types';
import { action, makeObservable, observable, runInAction } from 'mobx';

//todo: add changes to template
export class TrinityFetcherStore<Model extends object, FetchArgs extends unknown[] = unknown[]> {
  trinity: Trinity<Model>;

  constructor(defaultValue: Model, private fetcher: (...ars: FetchArgs) => Promise<Model>) {
    this.trinity = {
      data: defaultValue,
      isLoading: false,
      error: null
    };
    makeObservable(this, {
      trinity: observable,

      load: action
    });
  }

  async load(...args: FetchArgs) {
    runInAction(() => {
      this.trinity.isLoading = true;
      this.trinity.error = null;
    });

    try {
      const data = await this.fetcher(...args);
      runInAction(() => {
        this.trinity.data = data;
      });
    } catch (error) {
      this.trinity.error = error as Error;
    } finally {
      runInAction(() => {
        this.trinity.isLoading = false;
      });
    }
  }
}
