// @flow
import * as I from 'immutable'
import * as Types from './types/search'
import * as SearchGen from '../actions/search-gen'
import {amIFollowing} from './selectors'
import type {IconType} from '../common-adapters'
import type {TypedState} from './reducer'

export const makeSearchResult: I.RecordFactory<Types.SearchResult> = I.Record({
  id: '',
  leftFullname: null,
  leftIcon: null,
  leftService: 'Keybase',
  leftUsername: '',

  rightIcon: null,
  rightService: null,
  rightUsername: null,
})

function serviceIdToService(serviceId: string): Types.Service {
  return {
    facebook: 'Facebook',
    github: 'GitHub',
    hackernews: 'Hacker News',
    keybase: 'Keybase',
    reddit: 'Reddit',
    twitter: 'Twitter',
  }[serviceId]
}

function followStateHelper(state: TypedState, _username: ?string, _service: ?Types.Service) {
  const username = _username || ''
  const service = _service || ''
  const me = state.config.username
  if (service === 'Keybase') {
    if (username === me) {
      return 'You'
    } else {
      return amIFollowing(state, username) ? 'Following' : 'NotFollowing'
    }
  }
  return 'NoState'
}

function maybeUpgradeSearchResultIdToKeybaseId(
  searchResultMap: I.Map<Types.SearchResultId, I.RecordOf<Types.SearchResult>>,
  id: Types.SearchResultId
): Types.SearchResultId {
  const searchResult = searchResultMap.get(id)
  if (searchResult) {
    if (searchResult.leftService === 'Keybase') {
      return searchResult.leftUsername
    } else if (searchResult.rightService === 'Keybase') {
      return searchResult.rightUsername || id
    }
  }

  return id
}

function platformToLogo24(service: Types.Service): IconType {
  return {
    Facebook: 'icon-facebook-logo-24',
    GitHub: 'icon-github-logo-24',
    'Hacker News': 'icon-hacker-news-logo-24',
    Keybase: 'icon-keybase-logo-24',
    Pgp: 'icon-pgp-key-24',
    Reddit: 'icon-reddit-logo-24',
    Twitter: 'icon-twitter-logo-24',
  }[service]
}

const isUserInputItemsUpdated = (searchKey: string) => (action: any) =>
  action.type === SearchGen.userInputItemsUpdated && action.payload && action.payload.searchKey === searchKey

const getSearchResultIds = (state: TypedState, searchKey: string): ?I.List<Types.SearchResultId> =>
  state.entities.getIn(['search', 'searchKeyToResults', searchKey])

const getUserInputItemIds = (state: TypedState, searchKey: string): I.OrderedSet<Types.SearchResultId> =>
  state.entities.getIn(['search', 'searchKeyToUserInputItemIds', searchKey], I.OrderedSet())

const getClearSearchTextInput = ({entities}: TypedState, searchKey: string): number =>
  entities.getIn(['search', 'searchKeyToClearSearchTextInput', searchKey], 0)

export {
  serviceIdToService,
  followStateHelper,
  maybeUpgradeSearchResultIdToKeybaseId,
  platformToLogo24,
  getClearSearchTextInput,
  getSearchResultIds,
  getUserInputItemIds,
  isUserInputItemsUpdated,
}
