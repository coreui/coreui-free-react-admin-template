/**
 * @hidden
 */
export interface IUri {
    Protocol: string;
    HostNameAndPort: string;
    AbsolutePath: string;
    Search: string;
    Hash: string;
    PathSegments: string[];
}
