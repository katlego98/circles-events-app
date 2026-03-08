/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateEventRequest {
  /** @example "Tech Conference 2026" */
  title?: string;
  /** @example "Annual technology conference" */
  description?: string;
  /** @example "Tech" */
  category?: string;
  /** @example "Berlin" */
  location_city?: string;
  /** @example "Germany" */
  location_country?: string;
  /**
   * @format date-time
   * @example "2026-05-10T09:00:00Z"
   */
  start_datetime?: string;
  /**
   * @format date-time
   * @example "2026-05-10T18:00:00Z"
   */
  end_datetime?: string;
  /**
   * @format int32
   * @example 500
   */
  capacity?: number;
  /** @example 49.99 */
  price?: number;
}

export interface CreateEventResponse {
  /**
   * @format uuid
   * @example "3fa85f64-5717-4562-b3fc-2c963f66afa6"
   */
  id?: string;
  /** @example "DRAFT" */
  status?: "DRAFT" | "PUBLISHED" | "CANCELLED";
}

export interface StatusResponse {
  /** @example "PUBLISHED" */
  status?: "DRAFT" | "PUBLISHED" | "CANCELLED";
}

export interface CreateEventSeriesRequest {
  /** @example "Weekly Yoga Class" */
  title?: string;
  /** @example "Beginner friendly yoga sessions" */
  description?: string;
  /** @example "Health" */
  category?: string;
  /** @example "Amsterdam" */
  location_city?: string;
  /** @example "Netherlands" */
  location_country?: string;
  /** @example 15 */
  price?: number;
  /**
   * @format int32
   * @example 20
   */
  capacity?: number;
  /** @example "FREQ=WEEKLY;BYDAY=TU;COUNT=12" */
  recurrence_rule?: string;
  /**
   * @format date-time
   * @example "2026-02-03T18:00:00Z"
   */
  recurrence_start?: string;
  /**
   * @format date-time
   * @example "2026-04-21T19:00:00Z"
   */
  recurrence_end?: string;
}

export interface CreateEventSeriesResponse {
  /**
   * @format uuid
   * @example "3fa85f64-5717-4562-b3fc-2c963f66afa6"
   */
  series_id?: string;
  /** @example "DRAFT" */
  status?: "DRAFT" | "PUBLISHED" | "CANCELLED";
}

export interface PublishSeriesResponse {
  /** @example "PUBLISHED" */
  status?: "DRAFT" | "PUBLISHED" | "CANCELLED";
  /**
   * @format int32
   * @example 12
   */
  occurrences_created?: number;
}

export interface RegisterRequest {
  /** @example "Jane Doe" */
  name?: string;
  /** @example "jane@example.com" */
  email?: string;
  /** @example "Str0ngP@ssw0rd!" */
  password?: string;
}

export interface AuthResponse {
  /** @example "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqYW5lQGV4YW1wbGUuY29tIiwiaWF0IjoxNjk5OTk5OTk5LCJleHAiOjE3MDAwMDM1OTl9.VERYFAKETOKEN123" */
  access_token?: string;
  /** @example "Bearer" */
  token_type?: string;
  /**
   * @format int64
   * @example 3600
   */
  expires_in?: number;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface LoginRequest {
  /** @example "jane@example.com" */
  email?: string;
  /** @example "Str0ngP@ssw0rd!" */
  password?: string;
}

export interface ForgotPasswordRequest {
  /** @example "jane@example.com" */
  email?: string;
}

export interface MessageResponse {
  /** @example "Event updated successfully" */
  message?: string;
}

export interface UpdateEventRequest {
  /** @example "Updated Event Title" */
  title?: string;
  /** @example "Updated description for the event" */
  description?: string;
  /** @example "Tech" */
  category?: string;
  /** @example "Berlin" */
  location_city?: string;
  /** @example "Germany" */
  location_country?: string;
  /**
   * @format date-time
   * @example "2026-05-10T10:00:00Z"
   */
  start_datetime?: string;
  /**
   * @format date-time
   * @example "2026-05-10T19:00:00Z"
   */
  end_datetime?: string;
  /**
   * @format int32
   * @example 600
   */
  capacity?: number;
  /** @example 59.99 */
  price?: number;
}

export interface Event {
  /**
   * @format uuid
   * @example "3fa85f64-5717-4562-b3fc-2c963f66afa6"
   */
  id?: string;
  /**
   * @format uuid
   * @example "0f607264-765e-4b7f-9e37-7a8d5f7a6a3a"
   */
  organizerId?: string;
  /** @example "Tech Conference 2026" */
  title?: string;
  /** @example "Annual technology conference" */
  description?: string;
  /** @example "Tech" */
  category?: string;
  /** @example "Berlin" */
  locationCity?: string;
  /** @example "Germany" */
  locationCountry?: string;
  /**
   * @format date-time
   * @example "2026-05-10T09:00:00Z"
   */
  startDatetime?: string;
  /**
   * @format date-time
   * @example "2026-05-10T18:00:00Z"
   */
  endDatetime?: string;
  /**
   * @format int32
   * @example 500
   */
  capacity?: number;
  /**
   * @format int32
   * @example 120
   */
  bookedCount?: number;
  /** @example 49.99 */
  price?: number;
  /** @example "PUBLISHED" */
  status?: "DRAFT" | "PUBLISHED" | "CANCELLED";
  /**
   * @format date-time
   * @example "2026-01-15T08:30:00Z"
   */
  createdAt?: string;
  /**
   * @format date-time
   * @example "2026-03-01T12:00:00Z"
   */
  updatedAt?: string;
}

export interface EventsListResponse {
  /** List of events matching filters */
  data?: Event[];
  meta?: Meta;
}

export interface Meta {
  /**
   * @format int32
   * @example 1
   */
  page?: number;
  /**
   * @format int32
   * @example 20
   */
  limit?: number;
  /**
   * @format int64
   * @example 120
   */
  total_records?: number;
  /**
   * @format int64
   * @example 6
   */
  total_pages?: number;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "localhost:8080";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input;
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData());
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const responseToParse = responseFormat ? response.clone() : response;
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Hopp Events API
 * @version v1
 * @license Apache-2.0
 * @baseUrl localhost:8080
 * @contact Hopp Team
 *
 * OpenAPI documentation for the Hopp Events Booking & Management API.
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Events
     * @name List
     * @summary List & Filter Events
     * @request GET:/api/v1/events
     */
    list: (
      query?: {
        /**
         * City or country filter
         * @example "London"
         */
        location?: string;
        /**
         * Event category
         * @example "Music"
         */
        category?: string;
        /**
         * Minimum price
         * @example 0
         */
        min_price?: string;
        /**
         * Maximum price
         * @example 50
         */
        max_price?: string;
        /**
         * Start date (inclusive) in ISO date
         * @example "2026-05-01"
         */
        start_date?: string;
        /**
         * End date (inclusive) in ISO date
         * @example "2026-05-31"
         */
        end_date?: string;
        /**
         * Page number (1-based)
         * @format int32
         * @default 1
         * @example 1
         */
        page?: number;
        /**
         * Results per page
         * @format int32
         * @default 20
         * @example 20
         */
        limit?: number;
        /**
         * Sort by field: date or price
         * @example "date"
         */
        sort_by?: string;
        /**
         * Sort order: asc or desc
         * @example "asc"
         */
        order?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<EventsListResponse, any>({
        path: `/api/v1/events`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Events
     * @name Create
     * @summary Create Event
     * @request POST:/api/v1/events
     */
    create: (data: CreateEventRequest, params: RequestParams = {}) =>
      this.request<CreateEventResponse, any>({
        path: `/api/v1/events`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Events
     * @name Publish
     * @summary Publish Event
     * @request POST:/api/v1/events/{id}/publish
     */
    publish: (id: string, params: RequestParams = {}) =>
      this.request<StatusResponse, any>({
        path: `/api/v1/events/${id}/publish`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Events
     * @name Cancel
     * @summary Cancel Event
     * @request POST:/api/v1/events/{id}/cancel
     */
    cancel: (id: string, params: RequestParams = {}) =>
      this.request<StatusResponse, any>({
        path: `/api/v1/events/${id}/cancel`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Recurring Events
     * @name CreateSeries
     * @summary Create Recurring Event Series
     * @request POST:/api/v1/events/series
     */
    createSeries: (
      data: CreateEventSeriesRequest,
      params: RequestParams = {},
    ) =>
      this.request<CreateEventSeriesResponse, any>({
        path: `/api/v1/events/series`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Recurring Events
     * @name Publish1
     * @summary Publish Recurring Event Series
     * @request POST:/api/v1/events/series/{seriesId}/publish
     */
    publish1: (seriesId: string, params: RequestParams = {}) =>
      this.request<PublishSeriesResponse, any>({
        path: `/api/v1/events/series/${seriesId}/publish`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name Register
     * @summary Register a new user and get a JWT
     * @request POST:/api/v1/auth/register
     */
    register: (data: RegisterRequest, params: RequestParams = {}) =>
      this.request<AuthResponse, any>({
        path: `/api/v1/auth/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name Login
     * @summary Login with email and password to get a JWT
     * @request POST:/api/v1/auth/login
     */
    login: (data: LoginRequest, params: RequestParams = {}) =>
      this.request<AuthResponse, any>({
        path: `/api/v1/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name ForgotPassword
     * @summary Request a password reset (generic response)
     * @request POST:/api/v1/auth/forgot-password
     */
    forgotPassword: (data: ForgotPasswordRequest, params: RequestParams = {}) =>
      this.request<MessageResponse, any>({
        path: `/api/v1/auth/forgot-password`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Events
     * @name GetById
     * @summary Get Event by ID
     * @request GET:/api/v1/events/{id}
     */
    getById: (id: string, params: RequestParams = {}) =>
      this.request<Event, any>({
        path: `/api/v1/events/${id}`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Events
     * @name Delete
     * @summary Delete Event
     * @request DELETE:/api/v1/events/{id}
     */
    delete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/events/${id}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Events
     * @name Update
     * @summary Update Event
     * @request PATCH:/api/v1/events/{id}
     */
    update: (
      id: string,
      data: UpdateEventRequest,
      params: RequestParams = {},
    ) =>
      this.request<MessageResponse, any>({
        path: `/api/v1/events/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
}
