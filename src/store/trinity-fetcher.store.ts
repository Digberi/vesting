import { Trinity } from '@types';
import { action, makeObservable, observable } from 'mobx';

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
    this.trinity.isLoading = true;
    this.trinity.error = null;

    try {
      this.trinity.data = await this.fetcher(...args);
    } catch (error) {
      this.trinity.error = error as Error;
    } finally {
      this.trinity.isLoading = false;
    }
  }
}
