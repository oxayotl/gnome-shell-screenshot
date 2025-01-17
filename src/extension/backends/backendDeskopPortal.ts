import { portalScreenshot } from '../screenshotPortal';
import { getExtension } from '../extension';
import { ActionName, Backend, ErrorNotImplemented, ParamName, ScreenshotParams } from './backend';

function stripPrefix(prefix: string, s: string): string {
  if (s.startsWith(prefix)) {
    return s.slice(prefix.length);
  }
  return s;
}

export class BackendDeskopPortal implements Backend {
  supportsAction(action: ActionName): boolean {
    return action === 'open-portal';
  }

  supportsParam(_: ParamName): boolean {
    return false;
  }

  async exec(action: ActionName, _: ScreenshotParams): Promise<string> {
    if (action !== 'open-portal') {
      throw new ErrorNotImplemented(action);
    }
    return stripPrefix('file://', await portalScreenshot(await getExtension().servicePromise));
  }
}
