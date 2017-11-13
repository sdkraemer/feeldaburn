import { GuideService } from './guide.service';
import { IGuide, Guide } from 'app/core/';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';



describe('GuideService', () => {
    let guideService: GuideService;
    let mockAuthHttp;
    beforeEach(() => {
        mockAuthHttp = jasmine.createSpyObj('mockAuthHttp', ['get', 'post', 'put', 'delete']);
        guideService = new GuideService(mockAuthHttp);

    });

    describe('remove', () => {

        it('should call httpAuth.delete with the correct URL', () => {
            let guideId = '12345';
            mockAuthHttp.delete.and.returnValue(Observable.of(false));

            guideService.remove(guideId);
            expect(mockAuthHttp.delete).toHaveBeenCalledWith('/api/guides/12345');
        });
    });

    describe('getGuides', () => {
        it('should call httpAuth.get with the correct URL', () => {
            mockAuthHttp.get.and.returnValue(Observable.of(false));
            guideService.getGuides();
            expect(mockAuthHttp.get).toHaveBeenCalledWith('/api/guides');
        })
    });

    describe('getGuide', () => {
        it('should call httpAuth.get with the correct URL', () => {
            let guideId = '12345';
            mockAuthHttp.get.and.returnValue(Observable.of(false));
            guideService.getGuide(guideId);
            expect(mockAuthHttp.get).toHaveBeenCalledWith('/api/guides/12345');
        });
    });

    describe('add', () => {
        it('should call httpAuth.post with the correct URL', () => {
            let guide = new Guide({
                _id: '12345',
                name: 'Guide Name',
                description: 'Guide Description',
                exercises: [],
                createdAt: new Date()
            });

            mockAuthHttp.post.and.returnValue(Observable.of(false));
            guideService.add(guide);
            expect(mockAuthHttp.post).toHaveBeenCalledWith('/api/guides', guide);
        });
    });

    describe('update', () => {
        it('should call httpAuth.put with the correct URL', () => {
            let guide = new Guide({
                _id: '12345',
                name: 'Guide Name',
                description: 'Guide Description',
                exercises: [],
                createdAt: new Date()
            });
            
            mockAuthHttp.put.and.returnValue(Observable.of(false));
            guideService.update(guide);
            expect(mockAuthHttp.put).toHaveBeenCalledWith('/api/guides/12345', guide);
        });
    });


});