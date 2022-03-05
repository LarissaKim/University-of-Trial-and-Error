---
title: Build APIs You Won't Hate
tags:
  - notes
  - api
  - backend
  - rest
  - programming
layout: post.njk
---

# Build APIs You Won't Hate

Source: Build APIs You Won't Hate by Phil Sturgeon

**Table of Contents**

- [Database Seeding](#database-seeding)
- [Plan and Create Endpoints](#plan-and-create-endpoints)
- [Input and Output Theory](#input-and-output-theory)
- [Status Codes, Errors, and Messages](#status-codes-errors-and-messages)
- [Endpoint Testing](#endpoint-testing)
- [Outputting Data](#outputting-data)
- [Data Relationships](#data-relationships)
- [Authentication](#authentication)
- [Pagination](#pagination)
- [Documentation](#documentation)
- [HATEOS](#hateos)
- [API Versioning](#api-versioning)
- [Additional Resources](#additional-resources)

## Database Seeding

Populate ("seed") a database with fake data using a script. Fake data should be nonesense of the correct data type, size, and format.

Seeders should be grouped logically. One seeder should be used to create data that relates to each other (e.g. users, auth tokens, friendships)

## Plan and Create Endpoints

### Functional Requirements

1. Make an (extensive) list of _everything_ the API needs to handle.
2. Make a list of actions (not every action may need its own endpoint).

Example: Places

- Create
- Read
- Update
- Delete
- List (lat, lon, distance or box) _<- query filter params_
- Image _API will accept (single) image upload_

3.  Turn the actions into actual endpoints.

### Endpoint Theory

#### GET Resources

- `GET /resources` - paginated list of stuff in a default order logical for that specific data
- `GET /resource/X` - single entity `X`; can be ID, hash, slug, username, anything that uniquely identifies that "resource"
- `GET /resource/X, Y, Z` - multiple "resources" as requested by the client

**Sub-resources**

- `GET /places/X/checkins` - Find all checkins for place `X`
- `GET /users/X/checkins` - Find all checkins for user `X`
- ~~`GET /users/X/checkins/Y` - Find checkin `Y` for user `X`~~ -> prefers `GET /checkins/X`

> **Auto-Increment is the Devil**

- shows how many resources exist
- use unique identifiers instead

#### DELETE Resources

- `DELETE /places/X` - Delete place `X`
- `DELETE /places/X, Y, Z` - multiple places deleted
- `DELETE /places` - deletes all places _NOTE: potentially dangerous, consider skipping_
- `DELETE /places/X/image` - delete image for place `X`, or:
- `DELETE /places/X/images` - to delete all images for place `X`

#### POST/PUT

`PUT` is generally used if the entire URL is known beforehand and the action is idempotent (returns same result regardless how many times its repeated)

`POST` is generally used for actions that aren't idempotent.

Example: User settings

`POST /me/settings`: allows specific fields to be posted one at a time
`PUT /me/settings`: requires the entire body of settings

Example: Image upload

`PUT /places/1/image`: creates one image for a place; new attempt overrides existing image
`POST /places/1/images`: allows for multiple images; multiple attempts result in different images

**Plural, Singular, Both?**

Plural for everything is recommended.

- `/places` - expected to return a collection of places
- `/places/45` - expected to return places 45
- `/places/45/checkins` - expected to return checkins for places 45
- `/places/45/checkins/91` - expected to return checkins 91 for places 45
- `/checkins/91` - expected to return checkins 91

**Verb or Noun?**

Nouns are recommended. Resources are "things" (noun) and a URL becomes the "place" (also noun) on the Internet where a "thing" lives. Nouns also allow multiple HTTP actions to be made to the identical URL:

- `GET /users/janesmith/messages`
- `PATCH /users/janesmith/messages/xdWRwerG`
- `DELETE /users/janesmith/messages/xdWRwerG`

### Planning Endpoints

#### Controllers

Create a controller for each type of resource. Sub-resources could be methods in the resource's controller or their own controller.

#### Routes

| Action     | Endpoint                  | Route                                                               |
| ---------- | ------------------------- | ------------------------------------------------------------------- |
| Create     | `POST /users`             | `Route::post('users', 'UsersController@create')`                    |
| Read       | `GET /users/X`            | `Route::get('users/{id}', 'UsersController@show')`                  |
| Update     | `PUT /users/X`            | `Route::put('users/{id}', 'UsersController@update')`                |
| Delete     | `DELETE /users/X`         | `Route::delete('users/{id}', 'UsersController@delete')`             |
| List       | `GET /users`              | `Route::get('users', 'UsersController@list')`                       |
| Image      | `PUT /users/X/image`      | `Route::put('users/{id}/image', 'UsersController@uploadImage')`     |
| Favourites | `GET /users/X/favourites` | `Route::get('users/{id}/favourites', 'UsersController@favourites')` |
| Checkins   | `GET /users/X/checkins`   | `Route::get('users/{id}/checkins', 'CheckinsController@index')`     |

You don't want multiple endpoints using copy-paste logic to do the same things because it's frustrating to have different endpoints that provide the same resource but in a slighly different format.

#### Methods

Implement the routes as methods in their respective controllers. Make all, except one, empty. Test the output of the non-empty method as a smoke-test.

## Input and Output Theory

### Requests

Input is just an HTTP request:

```
POST /momens/1/gift HTTP /1.1 // requested URL path and HTTP version
Host: api.example.com // host name
Authorization: Bearer vr5HmMkzlxKE70W1y4MibiJUusZwZC25NOVBEx3BD1 // auth part of header
Content-Type: application/json // indicates type of content being sent in body

{ "user_id" : 2 }
```

Making an HTTP Request with Python

```python
import requests

headers = {
  'Authorization': 'Bearer vr5HmMkzlxKE70W1y4MibiJUusZwZC25NOVBEx3BD1',
  'Content-Type': 'application/json',
}

payload = {
  'user_id': 2
}

req = requests.post('http://api.example.com/moments/1/gift', data=json.dumps(payload), headers=headers)
```

Making an HTTP Request with JavaScript

```js
const headers = new Headers({
  Authorization: 'Bearer vr5HmMkzlxKE70W1y4MibiJUusZwZC25NOVBEx3BD1',
  'Content-Type': 'application/json',
});

const payload = {
  user_id: 2,
};

const req = await fetch('http://api.example.com/moments/1/gift', {
  method: 'POST',
  headers,
  body: JSON.stringify(payload, null, 2),
});
```

### Responses

```
HTTP/1.1 200 OK // status code
Server: nginx
Content-Type: application/json
Connection: close
Cache-Control: no-cache, private // caching is not ok
Date: Fri, 22 Nov 2013 16:37:57 GMT
Transfer-Encoding: Identity

 {"id":1690,"is_gift":true,"user":{"id":1,"name":"Theron Weissnat","bio":"Occaecati exceptu\
 ri magni odio distinctio dolores illum voluptas voluptatem in repellendus eum enim ","gend\
 er":"female","picture_url":"https:\/\/si0.twimg.com\/profile_images\/711293289\/hhdl-twitt\
 er_normal.png","cover_url":null,"location":null,"timezone":-1,"birthday":"1989-09-17 16:27\
 :36","status":"available","created_at":"2013-11-22 16:37:57","redeem_by":"2013-12-22 16:37\
 :57"}
```

### Supporting Formats

#### No Form Data

Sending data as `application/x-www-form-urlencoded` not recommended for various reasons, including the fact that data-types are not preserved (everything becomes a `string`) and readability suffers:

```
POST /checkins HTTP/1.1
Host: api.example.com
Authorization: Bearer vr5HmMkzlxKE70W1y4MibiJUusZwZC25NOVBEx3BD1
Content-Type: application/x-www-form-urlencoded

checkin[place_id]=1&checkin[message]=This is a bunch of text&checkin[with_friends][]=1&che\
ckin[with_friends][]=2&checkin[with_friends][]=3&checkin[with_friends][]=4&checkin[with_fr\
iends][]=5
```

#### JSON and XML

Understand what format(s) are actually needed and use those. (JSON preferred)

### Content Structure

**JSON API** format suggests using plural keys for both single item and collection resources:

```json
{
  "posts": [
    {
      "id": "1",
      "title": "Rails is Omakase"
    }
  ]
}
```

| Pros                                               | Cons                                                                 |
| -------------------------------------------------- | -------------------------------------------------------------------- |
| - Consistent response, _always_ has same structure | - RESTful/Data utilities may "freak" about array of single responses |
|                                                    | - Potentially confusing to humans                                    |

**Twitter-style** format returns a single object for a single item:

```json
{
  "name": "Phil Sturgeon",
  "id": "511501255"
}
```

and an array of objects for collection resources:

```json
[
  {
    "name": "Phil Sturgeon",
    "id": "511501255"
  },
  {
    "name": "Hulk Hogan",
    "id": "100002"
  }
]
```

| Pros                                               | Cons                                 |
| -------------------------------------------------- | ------------------------------------ |
| - Minimalistic response                            | - No space for pagination, meta data |
| - Widespread comprehension by frameworks/utilities |                                      |

**Facebook-style** format returns a single object for a single item:

```json
{
  "name": "Phil Sturgeon",
  "id": "511501255"
}
```

and an array of objects for collection resources, but namespaced:

```json
{
  "data": [
    {
      "name": "Phil Sturgeon",
      "id": "511501255"
    },
    {
      "name": "Hulk Hogan",
      "id": "100002"
    }
  ]
}
```

| Pros                                                             | Cons                                               |
| ---------------------------------------------------------------- | -------------------------------------------------- |
| - Space for pagination, meta data<br>- Response still simplistic | - Need to embed meta data in single item resources |
| - Response still simplistic                                      |                                                    |

"**Much Namespace, Nice Output**" format returns a namespaced single item:

```json
{
  "data": {
    "name": "Phil Sturgeon",
    "id": "511501255",
    "comments": {
      "data": [
        {
          "id": 123423,
          "text": "MongoDB is web-scale!"
        }
      ]
    }
  }
}
```

and namespaced collection resources:

```json
{
  "data": [
    {
      "name": "Phil Sturgeon",
      "id": "511501255"
    },
    {
      "name": "Hulk Hogan",
      "id": "100002"
    }
  ]
}
```

| Pros                                                                | Cons |
| ------------------------------------------------------------------- | ---- |
| - Space for pagination, meta data (both collection and single item) |      |
| - Response still simplistic                                         |      |

## Status Codes, Errors, and Messages

### HTTP Status Codes

**2xx: Success**
The client has been successful up to the point the response was sent.

**3xx: Redirect**
The calling application is being sent somewhere else for the actual resource.

**4xx: Client Error**
The client has something invalid and needs to fix the request before resending it.

**5xx: Server-side Error**
Something server-side went wrong. The client may/not retry the request.

Example status code usage:

- 200 - Generic everything OK
- 201 - Created something OK
- 202 - Accepted but being process async (e.g. encoding video, resizing image)
- 400 - Bad Request (invalid syntax)
- 401 - Unauthorized (no current user and there should be)
- 403 - Forbidden (current user not allows to access the requested data)
- 404 - Invalid URL route or item resource doesn't exist
- 405 - Method Not Allowed
- 410 - Data has been deleted, deactivated, suspended, etc.
- 500 - Something unexpected happened and the API is at fault
- 503 - API is not here right now, please try again later

### Error Codes and Error Messages

**Error codes** are a string or integer that corresponds to a human-readable **error message** with more information about what is going wrong (specific to application).

Twitter error code examples:

| Code | Text                                              | Description                                                                                                                                                  |
| ---- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 161  | You are unable to follow more people at this time | Corresponds with HTTP 403 - thrown when a user cannot follow another user due to some kind of limit                                                          |
| 179  | Sorry, you are not authorized to see this status  | Corresponds with HTTP 403 - thrown when a Tweet cannot be viewed by the authenticating user, usually due to the tweet's author having protected their tweets |

### Common Pitfalls

#### 200 OK and Error Code

> If you return a HTTP status code of 200 with an error code then Chuck Norris will roundhouse your door in, destroy your computer, instantly 35-pass wipe your backups, cancel your Dropbox account and block you from GitHub.

#### Non-Existent, Gone, or Hiding?

"Never existed", "no longer exists", "you can't view it", and "it is deactivated" should be split into 404, 403, 410 rather than all clumped as 404.

Is the 403 error because the user does not have sufficient authorization? Should the client suggest an account update? Is it because the user is not "friends" with the author of the content they are trying to view? Should the client suggest adding them as a friend?

Is the 410 error because the user deleted the entire piece of content or because they deleted their entire account?

Complement HTTP status codes with an error code that is unique within the API and is documented somewhere.

## Endpoint Testing

- When URL X is requested, the API should response with resource Y
- When JSON A is sent to the API, it should a) accept it, or b) freak out

Group various tests together as "features"; each "resource" and "sub-resource" should be its own "feature" (e.g. `/places` and `/places/X` are one feature but `/places/X/checkins` is a separate feature).

Each endpoint should have its own "Scenario" (Gherkin syntax). Think of the "guard clauses" that the endpoints will need, then make a “Scenario” for each of those:

<pre>
<b>Feature</b>: Places

<b>Scenario</b>: Finding a specific place
  When I request "GET /places/1"
  Then I <b>get</b> a "200" response
  And scope into the "data" property
    And the properties exist:
      """
      id
      name
      lat
      lon
      address1
      address2
      city
      state
      zip
      website
      phone
      """
    And the "id" property is an integer

<b>Scenario</b>: Searching non-existent places
When I request "GET /places?q=nonexistent place"
Then I <b>get</b> a "200" response
And the "data" property contains 0 items
</pre>

### TDD

Understanding the action plan, what the endpoints should be, and what their output should look like will help with building and testing endpoints one at a time.

## Outputting Data

### Direct Approach

Data from the database should not be directly passed as output.

- Performance: returning "all" items is not ideal when there's thousands or more records
- Display: may not be the desired data-type
- Security: can potentially expose sensitive information
- Stability: changes WILL be made in the database, which will cause the behaviour of the API to suffer

Data from the database should not be directly type-casted and formatted for output.

- Performance: still not solved (requires pagination)
- ~~Display: data-types are now correct~~
- ~~Security: this is also handled~~
- ~~Stability: so is this~~
- But this is "icky"

A better approach would be to have a function that "transforms" the resource to the appropriate JSON format:

```js
function transformPlaceToJson(place) {
  const place = {
    id: parseInt(place.id),
    name: place.name,
    lat: parseFloat(place.lat),
    lon: parseFloat(place.lon),
    createdAt: place.created_at.toString(),
  };

  return JSON.stringify(place);
}
```

### Transformations

The ideal approach would be to have a separate controllers ("Transformers") with just the transform method(s) for that resource:

```js
class PlaceTransformer {
  // Turn place item into a generic object
  static transform(place) {
    const place = {
      id: parseInt(place.id),
      name: place.name,
      lat: parseFloat(place.lat),
      lon: parseFloat(place.lon),
      address1: place.address1,
      address2: place.address2,
      city: place.city,
      state: place.state,
      zip: parseFloat(place.zip),
      website: place.website,
      phone: place.phone,
    };

    return JSON.stringify(place);
  }
}
```

### Hiding Schema Updates

Changing the internal data structure while keeping the external field name the same maintains control over stability for client applications.

| Before                    | After                                                             |
| ------------------------- | ----------------------------------------------------------------- |
| `website: place.website;` | `website: place.url;`                                             |
| `status: place.status;`   | `status: place.status === 'available' ? 'active' : place.status;` |

### Outputting Errors

Have an API Controller with convenience methods that handle simple error codes and responses.

```

Add code example here

```

## Data Relationships

RESTful relationships are usually similar to database relationships, but may have extra dynamic relationships or not include all relationships from the database. The output should be based on the "desire of the recipient" ([Roy Fielding](http://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm#sec_5_2)).

### Sub-resources

Related data can be expressed as a new URL for API consumers.

However, this results in an extra HTTP request. It also assumes the only related data is that single sub-resource when there could be many, which results in even more HTTP requests.

If you try to put as much data as possible into one request, the user may end up downloading huge files with information they don't want or need.

Only using sub-resources to load related data restricts an API's ability to be flexible for its consumers.

### 🟠 Foreign Key Arrays

Ids for the related data are included in the resource:

```json
{
  "post": {
    "id": 1,
    "title": "Progressive Enhancement is Dead",
    "comments": ["1", "2"],
    "_links": {
      "user": "/people/tomdale"
    }
  }
}
```

allowing for a grouped request for the subresource(s) (e.g., `/comments?ids=1,2`, `/people/tomdale`). However, the API consumer has to stitch the data together, which could be a lot of work for a large dataset.

### 🟢 Embedded Documents (Nesting)

An API consumer can choose which subresources to include by calling a URL such as `/placed?embed=checkins,merchant` and receive that data in the response inside the resource:

```json
{
  "data": [
    {
      "id": 2,
      "name": "Videology",
      "lat": 40.713857,
      "lon": -73.961936,
      "created_at": "2013-04-02",
      "checkins": [
        // ...
      ],
      "merchant": {
        // ...
      }
    }
    // ...
  ]
}
```

## Authentication

### When is Authentication Useful?

- tracking users
- giving endpoints user-context
- limit user access to endpoints
- filter data
- throttle or deactive accounts

**Read-only APIs** with data that is not sensitive could be made freely available without requiring authentication. Authentication could be implemented to limit DDoS attacks (valid authentication required to get response from the API; account gets throttled or deactivated if malicious activity detected). Additional security barriers (e.g. self-improving firewall) could also be implemented for stronger defense.

**Internal APIs** that run on a private network or are locked with firewall rules could also be made available without authentication. However, if the network has security issues, havoc will be wreaked when the network gets breached.

### Different Approached to Authentication

#### ❌ Basic

A username/password approach implemented on the HTTP request level and respected by browser (no cookies, session identifier, login pages).

Example HTTP request header:

`Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==`

```php
$ php -a
php > echo base64_decode('QWxhZGRpbjpvcGVuIHNlc2FtZQ==');
Aladin:open sesame
```

| Pros                                             | Cons                                                      |
| ------------------------------------------------ | --------------------------------------------------------- |
| - Easy to implement                              | - Ludicrously insecure over HTTP                          |
| - Easy to understand                             | - Fairly insecure over HTTPS                              |
| - Works in the browser and any other HTTP client | - Passwords can be stored by the browser :honey_pot::bee: |

#### ❌ Digest

An improvement on Basic authentication, it transmits passwords as a MD5 hash instead of plain-text.

| Pros                                        | Cons                                                            |
| ------------------------------------------- | --------------------------------------------------------------- |
| - Password is not transmitted in plain text | - Harder than basic auth to implement **well**                  |
| - `nonce` negates rainbow table attacks     | - Easy to implement badly                                       |
| - Generally more secure then basic auth     | - Still insecure over HTTP                                      |
| - Easier to implement that some approaches  | - Passwords can still be stored by the browser :honey_pot::bee: |
|                                             | - Uses MD5 (...4...3...2...1...**_HACKED_**!)                   |

#### ❌ OAuth 1.0a

A third-party (smartphone app, other website, CMS, etc.) could redirect a user to an integrated service (e.g. social network platform) that would authenticate the user via a web-based HTML login form on their website then redirect them back to the third-party along with a special token ("OAuth Token", "OAuth Token Secret"). The third-party wouldn't need to save a password.

Example HTTP request:

```
POST /moments/1/gift HTTP/1.1
Host: api.example.com
Authorization: OAuth realm="http://sp.example.com/",
oauth_consumer_key="0685bd9184jfhq22",
oauth_token="ad180jjd733klru7",
oauth_signature_method="HMAC-SHA1",
oauth_signature="wOJIO9A2W5mFwDgiDvZbTSMK%2FPY%3D",
oauth_timestamp="137131200",
oauth_nonce="4572616e48616d6d65724c61686176",
oauth_version="1.0"
Content-Type: application/json

{ "user_id" : 2 }

```

😵🤯

| Pros                                                                    | Cons                                     |
| ----------------------------------------------------------------------- | ---------------------------------------- |
| - Super secure, even without SSL                                        | - Complicated to interact with           |
| - Doesn't send username/password in every request                       | - Limited number of ways to grant access |
| - No username/password stored on third-party applications               | - Tokens never changed                   |
| - Attacker with OAuth Token/Secret shouldn't be able to change password |                                          |

#### ✔️ OAuth 2.0

User gets an access token that expires and needs to be "refreshed". OAuth 2.0 is good for most situations, provided that you **use SSL** and implement a **well-tested**, existing solution for your OAuth 2.0 server.

Example HTTP request:

```
POST /momens/1/gift HTTP /1.1
Host: api.example.com
Authorization: Bearer vr5HmMkzlxKE70W1y4MibiJUusZwZC25NOVBEx3BD1 // OAuth 2.0 Access Token
Content-Type: application/json

{ "user_id" : 2 }
```

#### Other Approaches

- OpenID - https://openid.net/
- Hawk - https://github.com/hueniverse/hawk
- Oz - https://github.com/hueniverse/oz

### Where the OAuth 2.0 Server Lives

An OAuth server usually has a web interface (with HTML forms, form validation, static resources, etc.). This would make it better suited to be placed on the website if it has a separate server from the API. The only thing the API needs is an Access Token (as a header) so it can find the datastore that contains the access tokens, validate it, then get the user associated with the token for use throughout the API code. Ideally, everything should be implemented autonomously.

### Understanding OAuth 2.0 Grant Types

#### Authorization Code

- Full user flow with redirects
- Useful for multiple sites or to share logins with partners

#### Refresh Token

- Request a new token when the current access token expires (HTTP 401 response)
- OAuth 2.0 server grants new access token or refuses
  - If server refused: user needs to make a manual request

#### Client Credentials

- Application uses client credentials (client_id, client_secret) to interact with the API directly (no user context)

#### Password (User Credentials)

- Username and password provided to OAuth 2.0 server, which returns an access (and refresh) token.
- Useful for single-page apps (don't need to redirect user)
- However, client_id and client_secret need to be sent with the username and password, but putting the client_secret into JavaScript means it is readable in the browser...
- Instead, make a proxy script that takes a username and password as POST items, pass them onto the OAuth 2.0 server with the client_id and client_secret (from some secret config file on the server)

#### Custom Grant Types

Example "sign-up or login" flow:

1. User provides a URL of an image, which contains a photograph of a car which happens to be yellow (:trollface:), or a string matching "facebook", "twitter", etc. and an `access_token`
2. Grab the users data
3. Find out if they are a registered user; create a new user if not
4. Create an access token, refresh token, etc. to give that user access

## Pagination

The splitting of data into multiple HTTP requests to limit the response size to:

- reduce amount of time spent downloading data
- reduce burden on database
- improve presentation logic when iterating over large amounts of records

The limit/number parameter from the client should have an **upper limit** set. The parameter should also be **greater than 0**, and an **integer** not a decimal.

### Paginators

Example response with meta data:

```json
{
  "data": [
    // ...
  ],
  "pagination": {
    "total": 1000, // number of records for this specific item
    "count": 12,
    "per_page": 12, // maximum number of items to be shown per page
    "current_page": 1,
    "total_pages": 84, // ceil(total / per page)
    "next_url": "https://api.example.com/places?page=2&number=12"
  }
}
```

- expensive to query database for total number of items
- caching, pre-population may be options for apps with small data sets
- doesn't scale well for large data sets
- content can be repeated if new item is added between HTTP requests

### Offsets and Cursors

Example response with meta data:

```json
{
  "data": [
    // ...
  ],
  "pagination": {
    "cursors": {
      "after": 12, // records with IDs 1-12 all available
      "next_url": "https://api.example.com/places?cursor=12&number=12" // retrieve 12 records *after* item with ID 12
    }
  }
}
```

- better to use offset instead of auto-incremented integers ('Fetch 12 records with an offset of 12' vs 'Fetch records after id=12')
- could encode offset values to obscure them, preventing people from doing calculations with the values
- respond with an empty collection if no more data to be found rather than a 404 (url is not wrong, there's just no more data)

```php
<?php
use Acme\Model\Place;
use Acme\Transformer\PlaceTransformer;
use League\Fractal\Cursor\Cursor;
use League\Fractal\Resource\Collection;

$current = isset($_GET['cursor']) ? (int) base64_decode($_GET['cursor']) : 0;
$per_page = isset($_GET['number']) ? (int) $_GET['number'] : 20;

$places = Place::findNearbyPlaces($lat, $lon)
  ->limit($per_page)
  ->skip($current)
  ->get();

$next = base64_encode((string) ($current + $per_page));

$cursor = new Cursor($current, $next, $places->count());

$resource = new Collection($places, new PlaceTransformer);
$resource->setCursor($cursor);
```

## Documentation

### Types of Documentation

#### API Reference

- list of all endpoints and their associated HTTP methods
- descriptions of what they do
- list of all arguments with descriptions of acceptable values, formats

#### Sample Code

- concrete exmaple in different language(s) showing common scenarios

#### Guides or Tutorials

- blog post with images, diagrams, code examples on a specific subject or scenario

## HATEOS

**H**ypermedia **a**s **t**he **E**ngine **o**f **A**pplication **S**tate

### Content Negotiation

URIs are a list of resources that can be represented in different formats depending on the `Accept` header, and **nothing else**.

```php
// Format response according to main mime-type value
// TODO: do something with charset, if provided
function respondWithArray(array $array, array $headers = []) {
  $mimeParts = (array) explode(';', Input::server('HTTP_ACCEPT'));
  $mimeType = strtolower($mimeParts[0]);

  switch ($mimeType) {
    case 'application/json':
      $contentType = 'application/json';
      $content = json_encode($array);
      break;
    case 'application/x-yaml':
      $contentType = 'application/x-yaml';
      $dumper = new YamlDumper();
      $content = $dumper->dump($array, 2);
      break;
    default:
      $contentType = 'application/json';
      $content = json_encode([
        'error' => [
          'code' => static::CODE_INVALID_MIME_TYPE,
          'http_code' => 415,
          'message' => sprintf('Content of type %s is not supported.', $mimeType),
        ]
      ]);
  }

  $response = Response::make($content, $this->statusCode, $headers);
  $response->header('Content-Type', $contentType);

  return $response;
}
```

### Hypermedia Controls

Hypermedia controls are just links; linking to other resources should be the same in an API as it is in a web page.
An API should be able to make perfect sense to an API client application and the human looking at the responses.

In addition to representing one or more resources, output should indicate what data can be related and where that data is located:

```json
{
  "data": [
    // ...
    "links": [
      {
        "rel": "self", // where the resource is actually located (may not be current URL)
        "uri": "/places/2"
      },
      {
        "rel": "place.checkins", // namespaced custom relationship with a sub-resource
        "uri": "/places/2/checkins"
      },
      {
        "rel": "place.image",
        "uri": "/places/2/image"
      }
    ]
  ]
}

```

#### Creating Hypermedia Controls

Adding links to the data output can be done in the "transformation" or "presentation" layer. These should only indicate the locations of resources, not actions.

```js
function transform(place) {
  return {
    // ...
    links: [
      {
        rel: 'self',
        uri: `/places/${place.id}`,
      },
      {
        rel: 'place.checkins',
        uri: `/places/${place.id}/checkins`,
      },
      {
        rel: 'place.image',
        uri: `/places/${place.id}/image`,
      },
    ],
  };
}
```

#### Discovering Resources Programmatically

Example request:

```
OPTIONS /places/2/checkins HTTP/1.1
Host: localhost:8000
```

Example response:

```
HTTP/1.1 200 OK
Host: localhost:8000
Connection: close
Allow: GET,HEAD,POST
```

```php
use GuzzleHttp\Client;

$client = new Client(['base_url' => 'http://localhost:8000']);
$response = $client->options('places/2/checkins');
$methods = array_walk('trim', explode(',', $response->getHeader('Accept')));
var_dump($methods); // ['GET', 'HEAD', 'POST']
```

## API Versioning

All approaches have their pros and cons, may not be technically "RESTful", difficult, or all of the above. Choose the approach that is most realistic for your project (implementation difficulty, target audience skill/knowledge level).

- [How are REST APIs versioned?](http://www.lexicalscope.com/blog/2012/03/12/how-are-rest-apis-versioned/) by Tim Wood
- [Versioning REST Web Services](http://barelyenough.org/blog/2008/05/versioning-rest-web-services/) by Peter Williams
- [Nobody Understands REST or HTTP](http://blog.steveklabnik.com/posts/2011-07-03-nobody-understands-rest-or-http#i_want_my_api_to_be_versioned) by Steve Klabnik

### 🟠 Approach #1: URI

`https://api.example.com/v1/places`

Consider making each version its own code-base (different web server hosts, even different servers).

- APIs with same language, framework, etc. can share a Git history
  Git Flow model:
  - 1.0/main
  - 1.0/develop
  - 2.0/main
  - 2.0/develop

**Popular APIs**

- Bitly
- Disqus
- Dropbox
- Bing
- Etsy
- Foursquare
- Tumblr
- Twitter
- Yammer
- YouTube

| Pros                        | Cons                                                               |
| --------------------------- | ------------------------------------------------------------------ |
| - Simple for API developers | - Not technically RESTful                                          |
| - Simple for API consumers  | - Tricky to separate onto different servers                        |
| - "Copy-pastable" URLs      | - Forces API consumers to do weird things to keep links up-to-date |

### 🟠 Approach #2: Hostname

`https://api-v1.example.com/places`

| Pros                                                      | Cons                                                               |
| --------------------------------------------------------- | ------------------------------------------------------------------ |
| - Simple for API developers                               | - Not technically RESTful                                          |
| - Simple for API consumers                                | - Forces API consumers to do weird things to keep links up-to-date |
| - "Copy-pastable" URLs                                    |                                                                    |
| - Easy to use DNS to split versions over multiple servers |                                                                    |

### 💀 Approach #3: Body and Query Params

```
POST /places HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
  "version": "1.0"
}
```

```
POST /places?version=1.0 HTTP/1.1
Host: api.example.com

header1,header2
value1,value2
```

**Popular APIs**

- Netflix
- Google Data
- PayPal
- Amazon SQS

| Pros                                                 | Cons                                                                                       |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| - Simple for API developers                          | - Different content-types require different params                                         |
| - Simple for API consumers                           | - Forces API consumers to do weird things to keep links up-to-date with query string param |
| - Keeps URLs the same when param is in the body      |                                                                                            |
| - Technically a bit more RESTful than URI versioning |                                                                                            |

### 💀 Approach #4: Custom Request Header

Example request:

```
GET /places HTTP/1.1
Host: api.example.com
BadAPIVersion: 1.0
```

Example response:

```
HTTP/1.1 200 OK
BadAPIVersion: 1.0
Vary: BadAPIVersion
```

**Popular APIs**

- Azure

| Pros                                                 | Cons                                                                 |
| ---------------------------------------------------- | -------------------------------------------------------------------- |
| - Simple for API consumers                           | - Cache systems can get confused                                     |
| - Keeps URLs the same                                | - API developers can get confused (if they don't know about headers) |
| - Technically a bit more RESTful than URI versioning |                                                                      |

### 🟢 Approach #5: Content Negotiation

`Accept: application/vnd.github[.version].param[+json]`

**Popular APIs**

- [GitHub](https://developer.github.com/v3/media/#api-v3-media-type-and-the-future)

| Pros                                                    | Cons                                                                   |
| ------------------------------------------------------- | ---------------------------------------------------------------------- |
| - Simple for API consumers (if they know about headers) | - API developers can get confused (if they don't know about headers)   |
| - Keeps URLs the same                                   | - Versioning entire API an confuse users (same as previous approaches) |
| - HATEOAS-friendly                                      |                                                                        |
| - Cache-friendly                                        |                                                                        |
| - Author-approved                                       |                                                                        |

### 🟢 Approach #6: Content Negotiation for Resources

`Accept: application/vnd.github[.resource][.version].param[+json]`

**Popular APIs**

- GitHub

| Pros                                 | Cons                                                                                 |
| ------------------------------------ | ------------------------------------------------------------------------------------ |
| - HATEOAS-friendly                   | - API consumers need to pay attention to versions                                    |
| - Cache-friendly                     | - Splitting across multiple codebases is hard                                        |
| - Keeps URLs the same                | - Accidental breakage can happen when in same codebase if transformers not versioned |
| - Easier upgrades for API consumers  |                                                                                      |
| - Can be on one codebase or multiple |                                                                                      |

### 🟠 Approach #7: Feature Flagging

Facebook makes a custom API version for each client application which gets enabled via feature flags ("Migrations"). Advance notice is given to API consumers when a new Migration becomes available. Eventually, the Migration becomes enabled by default, and changes are in effect across all consumers. Only one version is maintained at a time; feature flags only exist for a few months until the old code is removed.

It is hard to time the changeover for API consumers, so `if` statements are required to look for fields depending on the version with comments to remove them when the Migration is confirmed to work.

---

## Additional Resources

- [HTTP 1.1 Specification](http://www.w3.org/Protocols/rfc2616/rfc2616.html)
